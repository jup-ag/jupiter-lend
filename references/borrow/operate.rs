use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    account_info::AccountInfo,
    instruction::{AccountMeta, Instruction},
    program::{get_return_data, invoke},
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
    #[msg("Invalid return data from Vaults program")]
    InvalidReturnData,
}

/// Mirrors `TransferType` in the vaults IDL. Borsh encodes the variant index as one byte.
/// `operate` only treats `Claim` specially; `None`, `Skip` and `Direct` all transfer
/// withdrawn / borrowed tokens directly to the recipient.
#[derive(Clone, Copy, PartialEq)]
pub enum TransferType {
    Skip = 0,
    Direct = 1,
    Claim = 2,
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

/// Anchor reads the callee's own program ID in an optional account slot as `None`.
fn optional_meta(
    account: &Option<AccountInfo<'_>>,
    is_writable: bool,
    program_id: &Pubkey,
) -> AccountMeta {
    match account {
        Some(account) if is_writable => AccountMeta::new(*account.key, false),
        Some(account) => AccountMeta::new_readonly(*account.key, false),
        None => AccountMeta::new_readonly(*program_id, false),
    }
}

pub struct InitPositionParams<'info> {
    pub signer: AccountInfo<'info>,
    pub vault_admin: AccountInfo<'info>,
    pub vault_state: AccountInfo<'info>,
    pub position: AccountInfo<'info>,
    pub position_mint: AccountInfo<'info>,
    pub position_token_account: AccountInfo<'info>,
    pub metadata_account: AccountInfo<'info>,
    pub token_program: AccountInfo<'info>,
    pub associated_token_program: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
    pub sysvar_instruction: AccountInfo<'info>,
    pub metadata_program: AccountInfo<'info>,
    pub rent: AccountInfo<'info>,
    pub vaults_program: AccountInfo<'info>,
}

impl<'info> InitPositionParams<'info> {
    /// `next_position_id` must equal `vault_state.next_position_id`, otherwise the
    /// program fails with `VaultInvalidNextPositionId`.
    pub fn init_position(&self, vault_id: u16, next_position_id: u32) -> Result<()> {
        let mut instruction_data = get_init_position_discriminator();
        instruction_data.extend_from_slice(&vault_id.to_le_bytes());
        instruction_data.extend_from_slice(&next_position_id.to_le_bytes());

        let account_metas = vec![
            // signer (mutable, signer) - pays rent and receives the position NFT
            AccountMeta::new(*self.signer.key, true),
            // vault_admin (readonly)
            AccountMeta::new_readonly(*self.vault_admin.key, false),
            // vault_state (mutable)
            AccountMeta::new(*self.vault_state.key, false),
            // position (mutable)
            AccountMeta::new(*self.position.key, false),
            // position_mint (mutable)
            AccountMeta::new(*self.position_mint.key, false),
            // position_token_account (mutable)
            AccountMeta::new(*self.position_token_account.key, false),
            // metadata_account (mutable)
            AccountMeta::new(*self.metadata_account.key, false),
            // token_program
            AccountMeta::new_readonly(*self.token_program.key, false),
            // associated_token_program
            AccountMeta::new_readonly(*self.associated_token_program.key, false),
            // system_program
            AccountMeta::new_readonly(*self.system_program.key, false),
            // sysvar_instruction
            AccountMeta::new_readonly(*self.sysvar_instruction.key, false),
            // metadata_program
            AccountMeta::new_readonly(*self.metadata_program.key, false),
            // rent
            AccountMeta::new_readonly(*self.rent.key, false),
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
                self.metadata_account.clone(),
                self.token_program.clone(),
                self.associated_token_program.clone(),
                self.system_program.clone(),
                self.sysvar_instruction.clone(),
                self.metadata_program.clone(),
                self.rent.clone(),
                self.vaults_program.clone(),
            ],
        )
        .map_err(|_| error!(VaultsCpiErrorCodes::CpiToVaultsProgramFailed))
    }
}

pub struct OperateParams<'info> {
    // User accounts
    pub signer: AccountInfo<'info>,
    // Required for deposit, and for withdraw when no recipient is set
    pub signer_supply_token_account: Option<AccountInfo<'info>>,
    // Required for payback, and for borrow when no recipient is set
    pub signer_borrow_token_account: Option<AccountInfo<'info>>,
    // When `None`, withdrawn / borrowed tokens go to the signer's token accounts
    pub recipient: Option<AccountInfo<'info>>,
    pub recipient_borrow_token_account: Option<AccountInfo<'info>>,
    pub recipient_supply_token_account: Option<AccountInfo<'info>>,

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
    // Required only with `TransferType::Claim`
    pub supply_token_claim_account: Option<AccountInfo<'info>>,
    pub borrow_token_claim_account: Option<AccountInfo<'info>>,
    pub liquidity: AccountInfo<'info>,
    pub liquidity_program: AccountInfo<'info>,
    pub oracle_program: AccountInfo<'info>,

    // Programs
    pub supply_token_program: AccountInfo<'info>,
    pub borrow_token_program: AccountInfo<'info>,
    pub associated_token_program: Option<AccountInfo<'info>>,
    pub system_program: AccountInfo<'info>,
    pub vaults_program: AccountInfo<'info>,
}

impl<'info> OperateParams<'info> {
    /// `new_col` / `new_debt` are in the supply / borrow token's native decimals.
    /// Positive = deposit / borrow, negative = withdraw / payback, `i128::MIN` =
    /// withdraw all collateral / pay back all debt.
    ///
    /// Returns `(nft_id, new_col_final, new_debt_final)`; the final amounts are the
    /// signed token amounts actually transferred, in native decimals.
    pub fn operate(
        &self,
        new_col: i128,
        new_debt: i128,
        transfer_type: Option<TransferType>,
        remaining_accounts_indices: Vec<u8>,
        remaining_accounts: Vec<AccountInfo<'info>>,
    ) -> Result<(u32, i128, i128)> {
        // [oracle sources count, branch accounts count, tick has debt arrays count]
        if remaining_accounts_indices.len() != 3 {
            return Err(VaultsCpiErrorCodes::InvalidRemainingAccountsIndices.into());
        }

        if transfer_type == Some(TransferType::Claim)
            && ((new_col < 0 && self.supply_token_claim_account.is_none())
                || (new_debt > 0 && self.borrow_token_claim_account.is_none()))
        {
            return Err(VaultsCpiErrorCodes::MissingClaimAccount.into());
        }

        let mut instruction_data = get_operate_discriminator();
        instruction_data.extend_from_slice(&new_col.to_le_bytes());
        instruction_data.extend_from_slice(&new_debt.to_le_bytes());

        // Serialize transfer_type (Borsh Option<enum>)
        match transfer_type {
            Some(t) => {
                instruction_data.push(1); // Some
                instruction_data.push(t as u8);
            }
            None => instruction_data.push(0), // None
        }

        // Serialize remaining_accounts_indices (Borsh `bytes`: u32 LE length, then the bytes)
        instruction_data.extend_from_slice(&(remaining_accounts_indices.len() as u32).to_le_bytes());
        instruction_data.extend_from_slice(&remaining_accounts_indices);

        let program_id = self.vaults_program.key;

        // Every one of the 35 slots is always sent; optional accounts that are
        // `None` are filled with the vaults program ID.
        let mut account_metas = vec![
            // signer (mutable, signer)
            AccountMeta::new(*self.signer.key, true),
            // signer_supply_token_account (optional, mutable)
            optional_meta(&self.signer_supply_token_account, true, program_id),
            // signer_borrow_token_account (optional, mutable)
            optional_meta(&self.signer_borrow_token_account, true, program_id),
            // recipient (optional)
            optional_meta(&self.recipient, false, program_id),
            // recipient_borrow_token_account (optional, mutable)
            optional_meta(&self.recipient_borrow_token_account, true, program_id),
            // recipient_supply_token_account (optional, mutable)
            optional_meta(&self.recipient_supply_token_account, true, program_id),
            // vault_config
            AccountMeta::new_readonly(*self.vault_config.key, false),
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
            // current_position_tick_id
            AccountMeta::new_readonly(*self.current_position_tick_id.key, false),
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
            // supply_rate_model
            AccountMeta::new_readonly(*self.supply_rate_model.key, false),
            // borrow_rate_model
            AccountMeta::new_readonly(*self.borrow_rate_model.key, false),
            // vault_supply_token_account (mutable)
            AccountMeta::new(*self.vault_supply_token_account.key, false),
            // vault_borrow_token_account (mutable)
            AccountMeta::new(*self.vault_borrow_token_account.key, false),
            // supply_token_claim_account (optional, mutable)
            optional_meta(&self.supply_token_claim_account, true, program_id),
            // borrow_token_claim_account (optional, mutable)
            optional_meta(&self.borrow_token_claim_account, true, program_id),
            // liquidity
            AccountMeta::new_readonly(*self.liquidity.key, false),
            // liquidity_program
            AccountMeta::new_readonly(*self.liquidity_program.key, false),
            // oracle_program
            AccountMeta::new_readonly(*self.oracle_program.key, false),
            // supply_token_program
            AccountMeta::new_readonly(*self.supply_token_program.key, false),
            // borrow_token_program
            AccountMeta::new_readonly(*self.borrow_token_program.key, false),
            // associated_token_program (optional)
            optional_meta(&self.associated_token_program, false, program_id),
            // system_program
            AccountMeta::new_readonly(*self.system_program.key, false),
        ];

        // Remaining accounts: oracle sources (readonly), branches (mutable),
        // tick has debt arrays (mutable). Writability is taken from the caller's accounts.
        for account in remaining_accounts.iter() {
            if account.is_writable {
                account_metas.push(AccountMeta::new(*account.key, false));
            } else {
                account_metas.push(AccountMeta::new_readonly(*account.key, false));
            }
        }

        let instruction = Instruction {
            program_id: *program_id,
            accounts: account_metas,
            data: instruction_data,
        };

        let mut all_accounts = vec![
            self.signer.clone(),
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
            self.liquidity.clone(),
            self.liquidity_program.clone(),
            self.oracle_program.clone(),
            self.supply_token_program.clone(),
            self.borrow_token_program.clone(),
            self.system_program.clone(),
            self.vaults_program.clone(),
        ];

        // Add optional accounts that are present
        for account in [
            &self.signer_supply_token_account,
            &self.signer_borrow_token_account,
            &self.recipient,
            &self.recipient_borrow_token_account,
            &self.recipient_supply_token_account,
            &self.supply_token_claim_account,
            &self.borrow_token_claim_account,
            &self.associated_token_program,
        ]
        .into_iter()
        .flatten()
        {
            all_accounts.push(account.clone());
        }

        // Add remaining accounts
        all_accounts.extend(remaining_accounts);

        invoke(&instruction, &all_accounts)
            .map_err(|_| error!(VaultsCpiErrorCodes::CpiToVaultsProgramFailed))?;

        // `operate` returns (nft_id: u32, new_col_final: i128, new_debt_final: i128), Borsh-encoded.
        let (returning_program, data) =
            get_return_data().ok_or(error!(VaultsCpiErrorCodes::InvalidReturnData))?;
        // Return data is global to the transaction; make sure the vaults program set it.
        require_keys_eq!(
            returning_program,
            *program_id,
            VaultsCpiErrorCodes::InvalidReturnData
        );
        <(u32, i128, i128)>::try_from_slice(&data)
            .map_err(|_| error!(VaultsCpiErrorCodes::InvalidReturnData))
    }

    pub fn deposit(
        &self,
        amount: u64,
        remaining_accounts_indices: Vec<u8>,
        remaining_accounts: Vec<AccountInfo<'info>>,
    ) -> Result<(u32, i128, i128)> {
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
    ) -> Result<(u32, i128, i128)> {
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
    ) -> Result<(u32, i128, i128)> {
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
    ) -> Result<(u32, i128, i128)> {
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
    ) -> Result<(u32, i128, i128)> {
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
    ) -> Result<(u32, i128, i128)> {
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
