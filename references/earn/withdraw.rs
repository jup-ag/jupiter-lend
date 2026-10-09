use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    account_info::AccountInfo,
    instruction::{AccountMeta, Instruction},
    program::{get_return_data, invoke},
};

#[error_code]
pub enum ErrorCodes {
    #[msg("CPI_TO_LENDING_PROGRAM_FAILED")]
    CpiToLendingProgramFailed,
    #[msg("INVALID_RETURN_DATA")]
    InvalidReturnData,
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
    // Optional. `withdraw` always transfers directly, so `None` is the normal case.
    pub claim_account: Option<AccountInfo<'info>>,
    pub liquidity: AccountInfo<'info>,
    pub liquidity_program: AccountInfo<'info>,

    // Rewards and programs
    pub rewards_rate_model: AccountInfo<'info>,
    pub token_program: AccountInfo<'info>,
    pub associated_token_program: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,

    // Target lending program
    pub lending_program: AccountInfo<'info>,
}

impl<'info> WithdrawParams<'info> {
    /// Withdraws `amount` of the underlying token (native decimals) and returns
    /// the fToken shares burned. `amount == u64::MAX` withdraws the full
    /// fToken balance of `owner_token_account`.
    pub fn withdraw(&self, amount: u64) -> Result<u64> {
        let mut instruction_data = get_withdraw_discriminator();
        instruction_data.extend_from_slice(&amount.to_le_bytes());

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
            // claim_account (optional, mutable when present).
            // Anchor reads the callee's program ID in an optional slot as `None`.
            match &self.claim_account {
                Some(claim_account) => AccountMeta::new(*claim_account.key, false),
                None => AccountMeta::new_readonly(*self.lending_program.key, false),
            },
            // liquidity (mutable)
            AccountMeta::new(*self.liquidity.key, false),
            // liquidity_program (readonly)
            AccountMeta::new_readonly(*self.liquidity_program.key, false),
            // rewards_rate_model (readonly)
            AccountMeta::new_readonly(*self.rewards_rate_model.key, false),
            // token_program
            AccountMeta::new_readonly(*self.token_program.key, false),
            // associated_token_program (optional in the IDL; passing the ATA program is valid)
            AccountMeta::new_readonly(*self.associated_token_program.key, false),
            // system_program
            AccountMeta::new_readonly(*self.system_program.key, false),
        ];

        let instruction = Instruction {
            program_id: *self.lending_program.key,
            accounts: account_metas,
            data: instruction_data,
        };

        let mut account_infos = vec![
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
            self.liquidity.clone(),
            self.liquidity_program.clone(),
            self.rewards_rate_model.clone(),
            self.token_program.clone(),
            self.associated_token_program.clone(),
            self.system_program.clone(),
            self.lending_program.clone(),
        ];

        if let Some(claim_account) = &self.claim_account {
            account_infos.push(claim_account.clone());
        }

        invoke(&instruction, &account_infos)
            .map_err(|_| error!(ErrorCodes::CpiToLendingProgramFailed))?;

        // `withdraw` returns the shares burned as a Borsh-encoded u64.
        read_u64_return_data(self.lending_program.key)
    }
}

fn read_u64_return_data(lending_program: &Pubkey) -> Result<u64> {
    let (program_id, data) =
        get_return_data().ok_or(error!(ErrorCodes::InvalidReturnData))?;
    // Return data is global to the transaction; make sure the lending program set it.
    require_keys_eq!(program_id, *lending_program, ErrorCodes::InvalidReturnData);
    u64::try_from_slice(&data).map_err(|_| error!(ErrorCodes::InvalidReturnData))
}
