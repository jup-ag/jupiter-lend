use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    account_info::AccountInfo,
    instruction::{AccountMeta, Instruction},
    program::invoke,
};

#[error_code]
pub enum ErrorCodes {
    #[msg("CPI_TO_LENDING_PROGRAM_FAILED")]
    CpiToLendingProgramFailed,
}

fn get_withdraw_discriminator() -> Vec<u8> {
    // discriminator = sha256("global:withdraw")[0..8]
    vec![183, 18, 70, 156, 148, 109, 161, 34]
}

pub struct WithdrawParams<'info> {
    // User accounts
    pub signer: AccountInfo<'info>,
    pub owner_token_account: AccountInfo<'info>,
    pub recipient_token_account: AccountInfo<'info>,

    // Protocol accounts
    pub lending_admin: AccountInfo<'info>,
    pub lending: AccountInfo<'info>,
    pub mint: AccountInfo<'info>,
    pub f_token_mint: AccountInfo<'info>,

    // Liquidity protocol accounts
    pub supply_token_reserves_liquidity: AccountInfo<'info>,
    pub lending_supply_position_on_liquidity: AccountInfo<'info>,
    pub rate_model: AccountInfo<'info>,
    pub vault: AccountInfo<'info>,
    pub claim_account: AccountInfo<'info>,
    pub liquidity: AccountInfo<'info>,
    pub liquidity_program: AccountInfo<'info>,

    // Rewards and programs
    pub rewards_rate_model: AccountInfo<'info>,
    pub token_program: AccountInfo<'info>,
    pub associated_token_program: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,

    // Target lending program
    pub lending_program: UncheckedAccount<'info>,
}

impl<'info> WithdrawParams<'info> {
    pub fn withdraw(&self, assets: u64) -> Result<()> {
        let mut instruction_data = get_withdraw_discriminator();
        instruction_data.extend_from_slice(&assets.to_le_bytes());

        let account_metas = vec![
            // signer (mutable, signer)
            AccountMeta::new(*self.signer.key, true),
            // owner_token_account (mutable) - user's fToken account
            AccountMeta::new(*self.owner_token_account.key, false),
            // recipient_token_account (mutable) - user's underlying token account
            AccountMeta::new(*self.recipient_token_account.key, false),
            // lending_admin (readonly)
            AccountMeta::new_readonly(*self.lending_admin.key, false),
            // lending (mutable)
            AccountMeta::new(*self.lending.key, false),
            // mint (readonly) - underlying token mint
            AccountMeta::new_readonly(*self.mint.key, false),
            // f_token_mint (mutable)
            AccountMeta::new(*self.f_token_mint.key, false),
            // supply_token_reserves_liquidity (mutable)
            AccountMeta::new(*self.supply_token_reserves_liquidity.key, false),
            // lending_supply_position_on_liquidity (mutable)
            AccountMeta::new(*self.lending_supply_position_on_liquidity.key, false),
            // rate_model (readonly)
            AccountMeta::new_readonly(*self.rate_model.key, false),
            // vault (mutable)
            AccountMeta::new(*self.vault.key, false),
            // claim_account (mutable)
            AccountMeta::new(*self.claim_account.key, false),
            // liquidity (mutable)
            AccountMeta::new(*self.liquidity.key, false),
            // liquidity_program (mutable)
            AccountMeta::new(*self.liquidity_program.key, false),
            // rewards_rate_model (readonly)
            AccountMeta::new_readonly(*self.rewards_rate_model.key, false),
            // token_program
            AccountMeta::new_readonly(*self.token_program.key, false),
            // associated_token_program
            AccountMeta::new_readonly(*self.associated_token_program.key, false),
            // system_program
            AccountMeta::new_readonly(*self.system_program.key, false),
        ];

        let instruction = Instruction {
            program_id: *self.lending_program.key,
            accounts: account_metas,
            data: instruction_data,
        };

        invoke(
            &instruction,
            &[
                self.signer.clone(),
                self.owner_token_account.clone(),
                self.recipient_token_account.clone(),
                self.lending_admin.clone(),
                self.lending.clone(),
                self.mint.clone(),
                self.f_token_mint.clone(),
                self.supply_token_reserves_liquidity.clone(),
                self.lending_supply_position_on_liquidity.clone(),
                self.rate_model.clone(),
                self.vault.clone(),
                self.claim_account.clone(),
                self.liquidity.clone(),
                self.liquidity_program.clone(),
                self.rewards_rate_model.clone(),
                self.token_program.clone(),
                self.associated_token_program.clone(),
                self.system_program.clone(),
            ],
        )
        .map_err(|_| ErrorCodes::CpiToLendingProgramFailed.into())
    }
}
