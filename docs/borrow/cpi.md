# Jupiter Vaults CPI Documentation

## Overview

This documentation covers Cross-Program Invocation (CPI) integration for Jupiter Vaults, a sophisticated lending and borrowing protocol. The vault system uses NFT-based positions to manage user collateral and debt, with operations handled through a single `operate` function after initial position setup.

The account lists and instruction layouts below match the `vaults` IDL in [`target/idl/vaults.json`](../../target/idl/vaults.json) (version 0.1.8).

`operate` serves standard (T1) vaults only. Smart-collateral and smart-debt (DEX) vaults fail `operate` with `VaultInvalidVaultTypeForOperate`; they use `operate_dex` / `operate_perfect_dex`, which this guide does not cover.

### Deployed Addresses

#### Mainnet

| Program        | Address                                       | Link                                                                                              |
| -------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| VAULTS_PROGRAM | `jupr81YtYssSyPt8jbnGuiWon5f6x9TcDEFxYe3Bdzi` | [vaults_mainnet](https://explorer.solana.com/address/jupr81YtYssSyPt8jbnGuiWon5f6x9TcDEFxYe3Bdzi) |

This is the program ID of the `main` market and the address in the IDL. The SDK's `market` parameter also selects the `ethena` market, which are separate deployments with their own program IDs.

#### Devnet

| Program        | Address                                        | Link                                                                                                             |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| VAULTS_PROGRAM | `Ho32sUQ4NzuAQgkPkHuNDG3G18rgHmYtXFA8EBmqQrAu` | [vaults_devnet](https://explorer.solana.com/address/Ho32sUQ4NzuAQgkPkHuNDG3G18rgHmYtXFA8EBmqQrAu?cluster=devnet) |

> The devnet program was last deployed in May 2025 and does not match the current IDL. The `@jup-ag/lend` SDK does not target devnet. Test against mainnet, or a local validator with the mainnet programs cloned.

## Core Operation Flow

### Prerequisites

1. **Initialize Position NFT** - Required before any vault operations
2. **Operate** - Single function for all deposit/withdraw/borrow/payback operations

### Operation Types

- **Deposit + Borrow** - Supply collateral and borrow against it
- **Payback + Withdraw** - Repay debt and withdraw collateral

---

## 1. Initialize Position NFT

### Function Discriminator

```rust
fn get_init_position_discriminator() -> Vec<u8> {
    // discriminator = sha256("global:init_position")[0..8]
    vec![197, 20, 10, 1, 97, 160, 177, 91]
}
```

### Init Position CPI Struct

```rust
use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    account_info::AccountInfo,
    instruction::{AccountMeta, Instruction},
    program::{get_return_data, invoke},
};

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
```

### Init Position Implementation

```rust
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
```

### Init Position Accounts

| Account                    | Mutability | Address / derivation                                                                 |
| -------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| `signer`                   | Mutable    | Signer. Pays rent for the new accounts and receives the position NFT                 |
| `vault_admin`              | Immutable  | Vaults admin PDA `[b"vault_admin"]`                                                  |
| `vault_state`              | Mutable    | Vault state PDA `[b"vault_state", vault_id (u16 LE)]`                                |
| `position`                 | Mutable    | `[b"position", vault_id (u16 LE), next_position_id (u32 LE)]`                        |
| `position_mint`            | Mutable    | `[b"position_mint", vault_id (u16 LE), next_position_id (u32 LE)]`                   |
| `position_token_account`   | Mutable    | Associated token account of `signer` for `position_mint`                             |
| `metadata_account`         | Mutable    | Metaplex metadata PDA `[b"metadata", metadata_program, position_mint]`               |
| `token_program`            | Immutable  | SPL Token program                                                                    |
| `associated_token_program` | Immutable  | `ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL`                                       |
| `system_program`           | Immutable  | `11111111111111111111111111111111`                                                   |
| `sysvar_instruction`       | Immutable  | `Sysvar1nstructions1111111111111111111111111`                                        |
| `metadata_program`         | Immutable  | `metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s`                                        |
| `rent`                     | Immutable  | `SysvarRent111111111111111111111111111111111`                                        |

Read `next_position_id` from the `VaultState` account immediately before building the instruction. If another position is created first, the call fails with `VaultInvalidNextPositionId`.

---

## 2. Operate Function (Deposit/Withdraw/Borrow/Payback)

### Function Discriminator

```rust
fn get_operate_discriminator() -> Vec<u8> {
    // discriminator = sha256("global:operate")[0..8]
    vec![217, 106, 208, 99, 116, 151, 42, 135]
}
```

### Transfer Type

```rust
/// Mirrors `TransferType` in the vaults IDL. Borsh encodes the variant index as one byte.
/// `operate` only treats `Claim` specially; `None`, `Skip` and `Direct` all transfer
/// withdrawn / borrowed tokens directly to the recipient.
#[derive(Clone, Copy, PartialEq)]
pub enum TransferType {
    Skip = 0,
    Direct = 1,
    Claim = 2,
}
```

### Operate CPI Struct

```rust
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
```

### Operate Implementation

```rust
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
            AccountMeta::new(*self.signer.key, true),
            optional_meta(&self.signer_supply_token_account, true, program_id),
            optional_meta(&self.signer_borrow_token_account, true, program_id),
            optional_meta(&self.recipient, false, program_id),
            optional_meta(&self.recipient_borrow_token_account, true, program_id),
            optional_meta(&self.recipient_supply_token_account, true, program_id),
            AccountMeta::new_readonly(*self.vault_config.key, false),
            AccountMeta::new(*self.vault_state.key, false),
            AccountMeta::new_readonly(*self.supply_token.key, false),
            AccountMeta::new_readonly(*self.borrow_token.key, false),
            AccountMeta::new_readonly(*self.oracle.key, false),
            AccountMeta::new(*self.position.key, false),
            AccountMeta::new_readonly(*self.position_token_account.key, false),
            AccountMeta::new(*self.current_position_tick.key, false),
            AccountMeta::new(*self.final_position_tick.key, false),
            AccountMeta::new_readonly(*self.current_position_tick_id.key, false),
            AccountMeta::new(*self.final_position_tick_id.key, false),
            AccountMeta::new(*self.new_branch.key, false),
            AccountMeta::new(*self.supply_token_reserves_liquidity.key, false),
            AccountMeta::new(*self.borrow_token_reserves_liquidity.key, false),
            AccountMeta::new(*self.vault_supply_position_on_liquidity.key, false),
            AccountMeta::new(*self.vault_borrow_position_on_liquidity.key, false),
            AccountMeta::new_readonly(*self.supply_rate_model.key, false),
            AccountMeta::new_readonly(*self.borrow_rate_model.key, false),
            AccountMeta::new(*self.vault_supply_token_account.key, false),
            AccountMeta::new(*self.vault_borrow_token_account.key, false),
            optional_meta(&self.supply_token_claim_account, true, program_id),
            optional_meta(&self.borrow_token_claim_account, true, program_id),
            AccountMeta::new_readonly(*self.liquidity.key, false),
            AccountMeta::new_readonly(*self.liquidity_program.key, false),
            AccountMeta::new_readonly(*self.oracle_program.key, false),
            AccountMeta::new_readonly(*self.supply_token_program.key, false),
            AccountMeta::new_readonly(*self.borrow_token_program.key, false),
            optional_meta(&self.associated_token_program, false, program_id),
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
}
```

> Full snippet available [here](../../references/borrow/operate.rs). It also includes `deposit`, `withdraw`, `borrow`, `payback`, `deposit_and_borrow` and `payback_and_withdraw` wrappers.

### Operate Accounts

| #  | Account                              | Mutability | Notes                                                                       |
| -- | ------------------------------------ | ---------- | --------------------------------------------------------------------------- |
| 0  | `signer`                             | Mutable    | Signer. Must hold the position NFT for withdraw and borrow                  |
| 1  | `signer_supply_token_account`        | Mutable    | Optional. Supply-token account owned by `signer`                            |
| 2  | `signer_borrow_token_account`        | Mutable    | Optional. Borrow-token account owned by `signer`                            |
| 3  | `recipient`                          | Immutable  | Optional. Defaults to `signer`                                              |
| 4  | `recipient_borrow_token_account`     | Mutable    | Optional. Borrow-token account owned by `recipient`                         |
| 5  | `recipient_supply_token_account`     | Mutable    | Optional. Supply-token account owned by `recipient`                         |
| 6  | `vault_config`                       | Immutable  | `[b"vault_config", vault_id (u16 LE)]`                                      |
| 7  | `vault_state`                        | Mutable    | `[b"vault_state", vault_id (u16 LE)]`                                       |
| 8  | `supply_token`                       | Immutable  | Supply mint                                                                 |
| 9  | `borrow_token`                       | Immutable  | Borrow mint                                                                 |
| 10 | `oracle`                             | Immutable  | Must equal `vault_config.oracle`                                            |
| 11 | `position`                           | Mutable    | `[b"position", vault_id (u16 LE), nft_id (u32 LE)]`                         |
| 12 | `position_token_account`             | Immutable  | Token account holding the position NFT                                      |
| 13 | `current_position_tick`              | Mutable    | Tick of the position before the operation                                   |
| 14 | `final_position_tick`                | Mutable    | Tick of the position after the operation                                    |
| 15 | `current_position_tick_id`           | Immutable  | Tick ID liquidation account for the current tick                            |
| 16 | `final_position_tick_id`             | Mutable    | Tick ID liquidation account for the final tick                              |
| 17 | `new_branch`                         | Mutable    | Branch for the final tick                                                   |
| 18 | `supply_token_reserves_liquidity`    | Mutable    | Liquidity token reserve for the supply mint                                 |
| 19 | `borrow_token_reserves_liquidity`    | Mutable    | Liquidity token reserve for the borrow mint                                 |
| 20 | `vault_supply_position_on_liquidity` | Mutable    | Vault's supply position on the liquidity program                            |
| 21 | `vault_borrow_position_on_liquidity` | Mutable    | Vault's borrow position on the liquidity program                            |
| 22 | `supply_rate_model`                  | Immutable  | Liquidity rate model for the supply mint                                    |
| 23 | `borrow_rate_model`                  | Immutable  | Liquidity rate model for the borrow mint                                    |
| 24 | `vault_supply_token_account`         | Mutable    | Liquidity program's supply-token account                                    |
| 25 | `vault_borrow_token_account`         | Mutable    | Liquidity program's borrow-token account                                    |
| 26 | `supply_token_claim_account`         | Mutable    | Optional. Required for a withdraw with `TransferType::Claim`                |
| 27 | `borrow_token_claim_account`         | Mutable    | Optional. Required for a borrow with `TransferType::Claim`                  |
| 28 | `liquidity`                          | Immutable  | Liquidity program PDA                                                       |
| 29 | `liquidity_program`                  | Immutable  | Must equal `vault_config.liquidity_program`                                 |
| 30 | `oracle_program`                     | Immutable  | Oracle program                                                              |
| 31 | `supply_token_program`               | Immutable  | Token program of the supply mint                                            |
| 32 | `borrow_token_program`               | Immutable  | Token program of the borrow mint                                            |
| 33 | `associated_token_program`           | Immutable  | Optional                                                                    |
| 34 | `system_program`                     | Immutable  |                                                                             |

---

## Operation Patterns

Amounts are in the token's native decimals. The examples assume 6-decimal supply and borrow tokens.

### 1. Deposit Only

```rust
// Deposit 100 supply tokens
operate_params.operate(
    100_000_000, // new_col: 100 tokens at 6 decimals
    0,           // new_debt
    None,        // transfer_type
    vec![oracle_sources_count, branch_count, tick_debt_arrays_count],
    remaining_accounts,
)?;
```

### 2. Deposit + Borrow

```rust
// Deposit 100 supply tokens and borrow 50 borrow tokens
operate_params.operate(
    100_000_000, // new_col (deposit)
    50_000_000,  // new_debt (borrow)
    None,        // transfer_type
    vec![oracle_sources_count, branch_count, tick_debt_arrays_count],
    remaining_accounts,
)?;
```

### 3. Payback + Withdraw

```rust
// Payback 25 borrow tokens and withdraw 50 supply tokens
operate_params.operate(
    -50_000_000, // new_col (withdraw)
    -25_000_000, // new_debt (payback)
    None,        // transfer_type
    vec![oracle_sources_count, branch_count, tick_debt_arrays_count],
    remaining_accounts,
)?;
```

### 4. Max Withdraw

```rust
// Withdraw all available collateral
operate_params.operate(
    i128::MIN, // new_col (max withdraw)
    0,         // new_debt
    None,      // transfer_type
    vec![oracle_sources_count, branch_count, tick_debt_arrays_count],
    remaining_accounts,
)?;
```

### 5. Max Payback

```rust
// Payback all debt
operate_params.operate(
    0,         // new_col
    i128::MIN, // new_debt (max payback)
    None,      // transfer_type
    vec![oracle_sources_count, branch_count, tick_debt_arrays_count],
    remaining_accounts,
)?;
```

---

## Key Implementation Notes

### 1. Amounts, Scaling and Rounding

- `new_col` and `new_debt` are in the supply and borrow token's native decimals. Do not pre-scale them.
- Internally the program multiplies them by 10^(9 − decimals) to work at 9 decimals. This is exact (no rounding). Tokens with more than 9 decimals fail with `VaultInvalidDecimals`.
- Use `i128::MIN` for max withdraw/payback operations
- Positive values = deposit/borrow, Negative values = withdraw/payback
- The returned `new_col_final` / `new_debt_final` are converted back to native decimals with integer division, which truncates toward zero. Then:
  - **Withdraw** and **borrow**: the amount received is rounded down (in the protocol's favour).
  - **Deposit**: the amount taken is rounded up by one native unit (in the protocol's favour), unless the requested amount equals the full balance of `signer_supply_token_account`. Fund the account with the requested amount + 1, or deposit its exact balance.
  - **Payback**: the amount taken is rounded up by one native unit (in the protocol's favour), including max payback. Fund `signer_borrow_token_account` with the payback amount + 1.

### 2. Position Management

- Each user position is represented by an NFT
- The signer must own the position NFT token account, or be its approved delegate for the NFT, to withdraw or borrow
- Anyone can deposit to any position or payback debt for any position
- The snippets use `invoke`, so `signer` must sign the outer transaction. If a PDA of your program should own and operate the position, use `invoke_signed` with the PDA's seeds. For `init_position`, that PDA also pays rent and must hold enough lamports.

### 3. Optional Accounts

Optional accounts keep their position in the account list. To pass `None`, put the vaults program ID in that slot as a read-only account and include the vaults program's `AccountInfo` in the `invoke` account list. The snippet's `optional_meta` helper does this.

- Deposit requires `signer_supply_token_account`; payback requires `signer_borrow_token_account`.
- Withdraw and borrow pay out to `recipient_supply_token_account` / `recipient_borrow_token_account` when both `recipient` and that token account are set; otherwise they pay out to `signer_supply_token_account` / `signer_borrow_token_account`.
- Missing accounts fail with `VaultSignerSupplyTokenAccountRequired`, `VaultSignerBorrowTokenAccountRequired` or `VaultClaimAccountRequired`.

### 4. Remaining Accounts Structure

The `remaining_accounts_indices` vector must have exactly 3 entries, each the count of one account type:

- `indices[0]` = Oracle sources count
- `indices[1]` = Branch accounts count
- `indices[2]` = Tick has debt arrays count

Accounts are ordered in `remaining_accounts` as:

1. Oracle sources (0 to indices[0]) - read-only
2. Branch accounts (indices[0] to indices[0] + indices[1]) - writable
3. Tick has debt arrays (indices[0] + indices[1] to indices[0] + indices[1] + indices[2]) - writable

`remaining_accounts_indices` is a Borsh `bytes` value: a 4-byte little-endian length followed by the bytes.

### 5. Transfer Types

| Value               | Byte | Behaviour in `operate`                                                         |
| ------------------- | ---- | ------------------------------------------------------------------------------ |
| `None`              | -    | Direct transfer to the recipient                                               |
| `Some(Skip)`        | `0`  | Same as `None`                                                                 |
| `Some(Direct)`      | `1`  | Same as `None`                                                                 |
| `Some(Claim)`       | `2`  | Withdrawn / borrowed tokens go to the claim account on the liquidity program; requires `supply_token_claim_account` (withdraw) or `borrow_token_claim_account` (borrow) |

### 6. Writable Accounts

Request write access only where the account table says Mutable. `vault_config`, `liquidity`, `liquidity_program`, both rate models and `current_position_tick_id` are read-only. Write-locking them is not needed, and requesting write access to a program account fails the CPI with a privilege-escalation error unless the outer transaction marks it writable.

### 7. Error Handling

Common errors to handle:

- `VaultInvalidOperateAmount`: Operation amount too small or invalid
- `VaultInvalidDecimals`: Token decimals exceed maximum
- `VaultInvalidRemainingAccountsIndices`: `remaining_accounts_indices` does not have 3 entries
- `VaultInvalidVaultTypeForOperate`: The vault is a smart (DEX) vault
- `VaultSignerSupplyTokenAccountRequired` / `VaultSignerBorrowTokenAccountRequired`: Missing token account for the operation
- `VaultClaimAccountRequired`: `TransferType::Claim` without the claim account
- `VaultTickIsEmpty`: Position tick has no debt
- `VaultInvalidPaybackOrDeposit`: Invalid payback operation
- `VaultInvalidNextPositionId`: `init_position` called with a stale `next_position_id`
- `CpiToVaultsProgramFailed`, `InvalidReturnData`: CPI or return-data failure (defined by the caller in the snippets)

### 8. Return Values

The `operate` function returns a Borsh-encoded `(u32, i128, i128)` through Solana return data:

- `nft_id`: Position NFT ID
- `new_col_final`: Collateral change actually applied, in supply-token native decimals (positive = deposited, negative = withdrawn)
- `new_debt_final`: Debt change actually applied, in borrow-token native decimals (positive = borrowed, negative = paid back)

For max withdraw / max payback, these are the actual amounts, not `i128::MIN`.

---
