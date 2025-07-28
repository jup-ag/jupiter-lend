# Jupiter Vaults CPI Documentation

## Overview

This documentation covers Cross-Program Invocation (CPI) integration for Jupiter Vaults, a sophisticated lending and borrowing protocol. The vault system uses NFT-based positions to manage user collateral and debt, with operations handled through a single `operate` function after initial position setup.

### Deployed Addresses

#### Devnet

| Program        | Address                                        | Link                                                                                                             |
| -------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| VAULTS_PROGRAM | `Ho32sUQ4NzuAQgkPkHuNDG3G18rgHmYtXFA8EBmqQrAu` | [vaults_devnet](https://explorer.solana.com/address/Ho32sUQ4NzuAQgkPkHuNDG3G18rgHmYtXFA8EBmqQrAu?cluster=devnet) |

#### Staging Mainnet

| Program        | Address                                       | Link                                                                                              |
| -------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| VAULTS_PROGRAM | `jupr81YtYssSyPt8jbnGuiWon5f6x9TcDEFxYe3Bdzi` | [vaults_mainnet](https://explorer.solana.com/address/jupr81YtYssSyPt8jbnGuiWon5f6x9TcDEFxYe3Bdzi) |

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
    program::invoke,
};

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
```

### Init Position Implementation

```rust
impl<'info> InitPositionParams<'info> {
    pub fn init_position(&self, vault_id: u16, position_id: u32) -> Result<()> {
        let mut instruction_data = get_init_position_discriminator();
        instruction_data.extend_from_slice(&vault_id.to_le_bytes());
        instruction_data.extend_from_slice(&position_id.to_le_bytes());

        let account_metas = vec![
            AccountMeta::new(*self.signer.key, true),
            AccountMeta::new(*self.vault_admin.key, false),
            AccountMeta::new(*self.vault_state.key, false),
            AccountMeta::new(*self.position.key, false),
            AccountMeta::new(*self.position_mint.key, false),
            AccountMeta::new(*self.position_token_account.key, false),
            AccountMeta::new_readonly(*self.token_program.key, false),
            AccountMeta::new_readonly(*self.associated_token_program.key, false),
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
        .map_err(|_| ErrorCodes::CpiToVaultsProgramFailed.into())
    }
}
```

---

## 2. Operate Function (Deposit/Withdraw/Borrow/Payback)

### Function Discriminator

```rust
fn get_operate_discriminator() -> Vec<u8> {
    // discriminator = sha256("global:operate")[0..8]
    vec![217, 106, 208, 99, 116, 151, 42, 135]
}
```

### Operate CPI Struct

```rust
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
```

### Operate Implementation

```rust
impl<'info> OperateParams<'info> {
    pub fn operate(
        &self,
        new_col: i128,
        new_debt: i128,
        transfer_type: Option<u8>, // 0 = Normal, 1 = Claim
        remaining_accounts_indices: Vec<u8>,
        remaining_accounts: Vec<AccountInfo<'info>>,
    ) -> Result<(u32, i128, i128)> {
        let mut instruction_data = get_operate_discriminator();
        instruction_data.extend_from_slice(&new_col.to_le_bytes());
        instruction_data.extend_from_slice(&new_debt.to_le_bytes());

        // Serialize transfer_type
        match transfer_type {
            Some(t) => {
                instruction_data.push(1); // Some
                instruction_data.push(t);
            },
            None => instruction_data.push(0), // None
        }

        // Serialize remaining_accounts_indices
        instruction_data.push(remaining_accounts_indices.len() as u8);
        instruction_data.extend_from_slice(&remaining_accounts_indices);

        let mut account_metas = vec![
            AccountMeta::new(*self.signer.key, true),
            AccountMeta::new(*self.signer_supply_token_account.key, false),
            AccountMeta::new(*self.signer_borrow_token_account.key, false),
            AccountMeta::new_readonly(*self.recipient.key, false),
            AccountMeta::new(*self.recipient_borrow_token_account.key, false),
            AccountMeta::new(*self.recipient_supply_token_account.key, false),
            AccountMeta::new(*self.vault_config.key, false),
            AccountMeta::new(*self.vault_state.key, false),
            AccountMeta::new_readonly(*self.supply_token.key, false),
            AccountMeta::new_readonly(*self.borrow_token.key, false),
            AccountMeta::new_readonly(*self.oracle.key, false),
            AccountMeta::new(*self.position.key, false),
            AccountMeta::new_readonly(*self.position_token_account.key, false),
            AccountMeta::new(*self.current_position_tick.key, false),
            AccountMeta::new(*self.final_position_tick.key, false),
            AccountMeta::new(*self.current_position_tick_id.key, false),
            AccountMeta::new(*self.final_position_tick_id.key, false),
            AccountMeta::new(*self.new_branch.key, false),
            AccountMeta::new(*self.supply_token_reserves_liquidity.key, false),
            AccountMeta::new(*self.borrow_token_reserves_liquidity.key, false),
            AccountMeta::new(*self.vault_supply_position_on_liquidity.key, false),
            AccountMeta::new(*self.vault_borrow_position_on_liquidity.key, false),
            AccountMeta::new(*self.supply_rate_model.key, false),
            AccountMeta::new(*self.borrow_rate_model.key, false),
            AccountMeta::new(*self.vault_supply_token_account.key, false),
            AccountMeta::new(*self.vault_borrow_token_account.key, false),
        ];

        // Add optional claim accounts
        if let Some(ref claim_account) = self.supply_token_claim_account {
            account_metas.push(AccountMeta::new(*claim_account.key, false));
        }
        if let Some(ref claim_account) = self.borrow_token_claim_account {
            account_metas.push(AccountMeta::new(*claim_account.key, false));
        }

        // Add remaining accounts
        account_metas.extend(vec![
            AccountMeta::new(*self.liquidity.key, false),
            AccountMeta::new(*self.liquidity_program.key, false),
            AccountMeta::new_readonly(*self.oracle_program.key, false),
            AccountMeta::new_readonly(*self.supply_token_program.key, false),
            AccountMeta::new_readonly(*self.borrow_token_program.key, false),
            AccountMeta::new_readonly(*self.associated_token_program.key, false),
            AccountMeta::new_readonly(*self.system_program.key, false),
        ]);

        // Add remaining accounts (oracle sources, branches, tick arrays)
        for account in remaining_accounts {
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
            .map_err(|_| ErrorCodes::CpiToVaultsProgramFailed.into())?;

        // Return values would need to be parsed from logs or return data
        // For now, returning placeholder values
        Ok((0, new_col, new_debt))
    }
}
```

> Full snippet available [here](../../references/borrow/operate.rs)

---

## Operation Patterns

### 1. Deposit Only

```rust
// Deposit 100 supply tokens
operate_params.operate(
    100_000_000, // new_col (scaled to 1e9)
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

### 1. Amount Scaling

- All amounts are scaled to 1e9 decimals internally
- Use `i128::MIN` for max withdraw/payback operations
- Positive values = deposit/borrow, Negative values = withdraw/payback

### 2. Position Management

- Each user position is represented by an NFT
- Position NFT must be owned by the signer for withdraw/borrow operations
- Anyone can deposit to any position or payback debt for any position

### 3. Remaining Accounts Structure

The `remaining_accounts_indices` vector specifies the count of each account type:

- `indices[0]` = Oracle sources count
- `indices[1]` = Branch accounts count
- `indices[2]` = Tick has debt arrays count

Accounts are ordered in `remaining_accounts` as:

1. Oracle sources (0 to indices[0])
2. Branch accounts (indices[0] to indices[0] + indices[1])
3. Tick has debt arrays (indices[0] + indices[1] to indices[0] + indices[1] + indices[2])

### 4. Transfer Types

- `None` = Normal transfer
- `Some(1)` = Claim type transfer (requires claim accounts)

### 5. Error Handling

Common errors to handle:

- `VaultInvalidOperateAmount`: Operation amount too small or invalid
- `VaultInvalidDecimals`: Token decimals exceed maximum
- `VaultTickIsEmpty`: Position tick has no debt
- `VaultInvalidPaybackOrDeposit`: Invalid payback operation
- `CpiToVaultsProgramFailed`: CPI call failed

### 6. Return Values

The `operate` function returns:

- `nft_id`: Position NFT ID
- `new_col_final`: Final collateral change amount (unscaled)
- `new_debt_final`: Final debt change amount (unscaled)

---
