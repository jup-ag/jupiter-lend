use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    account_info::AccountInfo,
    instruction::{AccountMeta, Instruction},
    program::invoke,
    pubkey::Pubkey,
};

// Error codes for CPI failures
#[error_code]
pub enum VaultsCpiErrorCodes {
    #[msg("CPI to Vaults program failed")]
    CpiToVaultsProgramFailed,
    #[msg("Invalid remaining accounts indices")]
    InvalidRemainingAccountsIndices,
    #[msg("Missing required claim account")]
    MissingClaimAccount,
}

#[derive(Clone, Copy, PartialEq)]
pub enum TransferType {
    Normal = 0,
    Claim = 1,
}

// Function discriminators
fn get_init_position_discriminator() -> Vec<u8> {
    // discriminator = sha256("global:init_position")[0..8]
    vec![197, 20, 10, 1, 97, 160, 177, 91]
}

fn get_operate_discriminator() -> Vec<u8> {
    // discriminator = sha256("global:operate")[0..8]
    vec![217, 106, 208, 99, 116, 151, 42, 135]
}

pub struct InitPositionParams<'info> {
    pub signer: AccountInfo<'info>,
    pub vault_admin: AccountInfo<'info>,
    pub vault_state: AccountInfo<'info>,
    pub position: AccountInfo<'info>,
    pub position_mint: AccountInfo<'info>,
    pub position_token_account: AccountInfo<'info>,
    pub token_program: AccountInfo<'info>,
    pub associated_token_program: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
    pub vaults_program: UncheckedAccount<'info>,
}

impl<'info> InitPositionParams<'info> {
    pub fn init_position(&self, vault_id: u16, next_position_id: u32) -> Result<()> {
        let mut instruction_data = get_init_position_discriminator();
        instruction_data.extend_from_slice(&vault_id.to_le_bytes());
        instruction_data.extend_from_slice(&next_position_id.to_le_bytes());

        let account_metas = vec![
            // signer (mutable, signer)
            AccountMeta::new(*self.signer.key, true),
            // vault_admin (mutable)
            AccountMeta::new(*self.vault_admin.key, false),
            // vault_state (mutable)
            AccountMeta::new(*self.vault_state.key, false),
            // position (mutable)
            AccountMeta::new(*self.position.key, false),
            // position_mint (mutable)
            AccountMeta::new(*self.position_mint.key, false),
            // position_token_account (mutable)
            AccountMeta::new(*self.position_token_account.key, false),
            // token_program
            AccountMeta::new_readonly(*self.token_program.key, false),
            // associated_token_program
            AccountMeta::new_readonly(*self.associated_token_program.key, false),
            // system_program
            AccountMeta::new_readonly(*self.system_program.key, false),
        ];

        let instruction = Instruction {
            program_id: *self.vaults_program.key,
            accounts: account_metas,
            data: instruction_data,
        };

        invoke(
            &instruction,
            &[
                self.signer.clone(),
                self.vault_admin.clone(),
                self.vault_state.clone(),
                self.position.clone(),
                self.position_mint.clone(),
                self.position_token_account.clone(),
                self.token_program.clone(),
                self.associated_token_program.clone(),
                self.system_program.clone(),
            ],
        )
        .map_err(|_| VaultsCpiErrorCodes::CpiToVaultsProgramFailed.into())
    }
}

pub struct OperateParams<'info> {
    // User accounts
    pub signer: AccountInfo<'info>,
    pub signer_supply_token_account: AccountInfo<'info>,
    pub signer_borrow_token_account: AccountInfo<'info>,
    pub recipient: AccountInfo<'info>,
    pub recipient_borrow_token_account: AccountInfo<'info>,
    pub recipient_supply_token_account: AccountInfo<'info>,

    // Vault accounts
    pub vault_config: AccountInfo<'info>,
    pub vault_state: AccountInfo<'info>,
    pub supply_token: AccountInfo<'info>,
    pub borrow_token: AccountInfo<'info>,
    pub oracle: AccountInfo<'info>,

    // Position accounts
    pub position: AccountInfo<'info>,
    pub position_token_account: AccountInfo<'info>,
    pub current_position_tick: AccountInfo<'info>,
    pub final_position_tick: AccountInfo<'info>,
    pub current_position_tick_id: AccountInfo<'info>,
    pub final_position_tick_id: AccountInfo<'info>,
    pub new_branch: AccountInfo<'info>,

    // Liquidity protocol accounts
    pub supply_token_reserves_liquidity: AccountInfo<'info>,
    pub borrow_token_reserves_liquidity: AccountInfo<'info>,
    pub vault_supply_position_on_liquidity: AccountInfo<'info>,
    pub vault_borrow_position_on_liquidity: AccountInfo<'info>,
    pub supply_rate_model: AccountInfo<'info>,
    pub borrow_rate_model: AccountInfo<'info>,
    pub vault_supply_token_account: AccountInfo<'info>,
    pub vault_borrow_token_account: AccountInfo<'info>,
    pub supply_token_claim_account: Option<AccountInfo<'info>>,
    pub borrow_token_claim_account: Option<AccountInfo<'info>>,
    pub liquidity: AccountInfo<'info>,
    pub liquidity_program: AccountInfo<'info>,
    pub oracle_program: AccountInfo<'info>,

    // Programs
    pub supply_token_program: AccountInfo<'info>,
    pub borrow_token_program: AccountInfo<'info>,
    pub associated_token_program: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
    pub vaults_program: UncheckedAccount<'info>,
}

impl<'info> OperateParams<'info> {
    pub fn operate(
        &self,
        new_col: i128,
        new_debt: i128,
        transfer_type: Option<TransferType>,
        remaining_accounts_indices: Vec<u8>,
        remaining_accounts: Vec<AccountInfo<'info>>,
    ) -> Result<()> {
        // Validate remaining accounts indices
        if remaining_accounts_indices.len() != 3 {
            return Err(VaultsCpiErrorCodes::InvalidRemainingAccountsIndices.into());
        }

        let mut instruction_data = get_operate_discriminator();
        instruction_data.extend_from_slice(&new_col.to_le_bytes());
        instruction_data.extend_from_slice(&new_debt.to_le_bytes());

        // Serialize transfer_type
        match transfer_type {
            Some(t) => {
                instruction_data.push(1); // Some
                instruction_data.push(t as u8);
            }
            None => instruction_data.push(0), // None
        }

        // Serialize remaining_accounts_indices
        instruction_data.push(remaining_accounts_indices.len() as u8);
        instruction_data.extend_from_slice(&remaining_accounts_indices);

        let mut account_metas = vec![
            // signer (mutable, signer)
            AccountMeta::new(*self.signer.key, true),
            // signer_supply_token_account (mutable)
            AccountMeta::new(*self.signer_supply_token_account.key, false),
            // signer_borrow_token_account (mutable)
            AccountMeta::new(*self.signer_borrow_token_account.key, false),
            // recipient
            AccountMeta::new_readonly(*self.recipient.key, false),
            // recipient_borrow_token_account (mutable)
            AccountMeta::new(*self.recipient_borrow_token_account.key, false),
            // recipient_supply_token_account (mutable)
            AccountMeta::new(*self.recipient_supply_token_account.key, false),
            // vault_config (mutable)
            AccountMeta::new(*self.vault_config.key, false),
            // vault_state (mutable)
            AccountMeta::new(*self.vault_state.key, false),
            // supply_token
            AccountMeta::new_readonly(*self.supply_token.key, false),
            // borrow_token
            AccountMeta::new_readonly(*self.borrow_token.key, false),
            // oracle
            AccountMeta::new_readonly(*self.oracle.key, false),
            // position (mutable)
            AccountMeta::new(*self.position.key, false),
            // position_token_account
            AccountMeta::new_readonly(*self.position_token_account.key, false),
            // current_position_tick (mutable)
            AccountMeta::new(*self.current_position_tick.key, false),
            // final_position_tick (mutable)
            AccountMeta::new(*self.final_position_tick.key, false),
            // current_position_tick_id (mutable)
            AccountMeta::new(*self.current_position_tick_id.key, false),
            // final_position_tick_id (mutable)
            AccountMeta::new(*self.final_position_tick_id.key, false),
            // new_branch (mutable)
            AccountMeta::new(*self.new_branch.key, false),
            // supply_token_reserves_liquidity (mutable)
            AccountMeta::new(*self.supply_token_reserves_liquidity.key, false),
            // borrow_token_reserves_liquidity (mutable)
            AccountMeta::new(*self.borrow_token_reserves_liquidity.key, false),
            // vault_supply_position_on_liquidity (mutable)
            AccountMeta::new(*self.vault_supply_position_on_liquidity.key, false),
            // vault_borrow_position_on_liquidity (mutable)
            AccountMeta::new(*self.vault_borrow_position_on_liquidity.key, false),
            // supply_rate_model (mutable)
            AccountMeta::new(*self.supply_rate_model.key, false),
            // borrow_rate_model (mutable)
            AccountMeta::new(*self.borrow_rate_model.key, false),
            // vault_supply_token_account (mutable)
            AccountMeta::new(*self.vault_supply_token_account.key, false),
            // vault_borrow_token_account (mutable)
            AccountMeta::new(*self.vault_borrow_token_account.key, false),
        ];

        // Add optional claim accounts
        if let Some(ref claim_account) = self.supply_token_claim_account {
            account_metas.push(AccountMeta::new(*claim_account.key, false));
        }
        if let Some(ref claim_account) = self.borrow_token_claim_account {
            account_metas.push(AccountMeta::new(*claim_account.key, false));
        }

        // Add remaining required accounts
        account_metas.extend(vec![
            // liquidity (mutable)
            AccountMeta::new(*self.liquidity.key, false),
            // liquidity_program (mutable)
            AccountMeta::new(*self.liquidity_program.key, false),
            // oracle_program
            AccountMeta::new_readonly(*self.oracle_program.key, false),
            // supply_token_program
            AccountMeta::new_readonly(*self.supply_token_program.key, false),
            // borrow_token_program
            AccountMeta::new_readonly(*self.borrow_token_program.key, false),
            // associated_token_program
            AccountMeta::new_readonly(*self.associated_token_program.key, false),
            // system_program
            AccountMeta::new_readonly(*self.system_program.key, false),
        ]);

        // Add remaining accounts (oracle sources, branches, tick arrays)
        for account in &remaining_accounts {
            account_metas.push(AccountMeta::new(*account.key, false));
        }

        let instruction = Instruction {
            program_id: *self.vaults_program.key,
            accounts: account_metas,
            data: instruction_data,
        };

        let mut all_accounts = vec![
            self.signer.clone(),
            self.signer_supply_token_account.clone(),
            self.signer_borrow_token_account.clone(),
            self.recipient.clone(),
            self.recipient_borrow_token_account.clone(),
            self.recipient_supply_token_account.clone(),
            self.vault_config.clone(),
            self.vault_state.clone(),
            self.supply_token.clone(),
            self.borrow_token.clone(),
            self.oracle.clone(),
            self.position.clone(),
            self.position_token_account.clone(),
            self.current_position_tick.clone(),
            self.final_position_tick.clone(),
            self.current_position_tick_id.clone(),
            self.final_position_tick_id.clone(),
            self.new_branch.clone(),
            self.supply_token_reserves_liquidity.clone(),
            self.borrow_token_reserves_liquidity.clone(),
            self.vault_supply_position_on_liquidity.clone(),
            self.vault_borrow_position_on_liquidity.clone(),
            self.supply_rate_model.clone(),
            self.borrow_rate_model.clone(),
            self.vault_supply_token_account.clone(),
            self.vault_borrow_token_account.clone(),
        ];

        // Add optional claim accounts
        if let Some(ref claim_account) = self.supply_token_claim_account {
            all_accounts.push(claim_account.clone());
        }

        if let Some(ref claim_account) = self.borrow_token_claim_account {
            all_accounts.push(claim_account.clone());
        }

        all_accounts.extend(vec![
            self.liquidity.clone(),
            self.liquidity_program.clone(),
            self.oracle_program.clone(),
            self.supply_token_program.clone(),
            self.borrow_token_program.clone(),
            self.associated_token_program.clone(),
            self.system_program.clone(),
        ]);

        // Add remaining accounts
        all_accounts.extend(remaining_accounts);

        invoke(&instruction, &all_accounts)
            .map_err(|_| VaultsCpiErrorCodes::CpiToVaultsProgramFailed.into())?;

        Ok(())
    }

    pub fn deposit(
        &self,
        amount: u64,
        remaining_accounts_indices: Vec<u8>,
        remaining_accounts: Vec<AccountInfo<'info>>,
    ) -> Result<()> {
        self.operate(
            amount as i128,
            0,
            None,
            remaining_accounts_indices,
            remaining_accounts,
        )
    }

    pub fn withdraw(
        &self,
        amount: u64,
        transfer_type: Option<TransferType>,
        remaining_accounts_indices: Vec<u8>,
        remaining_accounts: Vec<AccountInfo<'info>>,
    ) -> Result<()> {
        let withdraw_amount = if amount == u64::MAX {
            i128::MIN // Max withdraw
        } else {
            -(amount as i128)
        };

        self.operate(
            withdraw_amount,
            0,
            transfer_type,
            remaining_accounts_indices,
            remaining_accounts,
        )
    }

    pub fn borrow(
        &self,
        amount: u64,
        transfer_type: Option<TransferType>,
        remaining_accounts_indices: Vec<u8>,
        remaining_accounts: Vec<AccountInfo<'info>>,
    ) -> Result<()> {
        self.operate(
            0,
            amount as i128,
            transfer_type,
            remaining_accounts_indices,
            remaining_accounts,
        )
    }

    pub fn payback(
        &self,
        amount: u64,
        remaining_accounts_indices: Vec<u8>,
        remaining_accounts: Vec<AccountInfo<'info>>,
    ) -> Result<()> {
        let payback_amount = if amount == u64::MAX {
            i128::MIN // Max payback
        } else {
            -(amount as i128)
        };

        self.operate(
            0,
            payback_amount,
            None,
            remaining_accounts_indices,
            remaining_accounts,
        )
    }

    pub fn deposit_and_borrow(
        &self,
        deposit_amount: u64,
        borrow_amount: u64,
        transfer_type: Option<TransferType>,
        remaining_accounts_indices: Vec<u8>,
        remaining_accounts: Vec<AccountInfo<'info>>,
    ) -> Result<()> {
        self.operate(
            deposit_amount as i128,
            borrow_amount as i128,
            transfer_type,
            remaining_accounts_indices,
            remaining_accounts,
        )
    }

    pub fn payback_and_withdraw(
        &self,
        payback_amount: u64,
        withdraw_amount: u64,
        transfer_type: Option<TransferType>,
        remaining_accounts_indices: Vec<u8>,
        remaining_accounts: Vec<AccountInfo<'info>>,
    ) -> Result<()> {
        let payback = if payback_amount == u64::MAX {
            i128::MIN
        } else {
            -(payback_amount as i128)
        };

        let withdraw = if withdraw_amount == u64::MAX {
            i128::MIN
        } else {
            -(withdraw_amount as i128)
        };

        self.operate(
            withdraw,
            payback,
            transfer_type,
            remaining_accounts_indices,
            remaining_accounts,
        )
    }
}
