# Jupiter Lend Earn CPI Documentation

## Overview

This documentation covers Cross-Program Invocation (CPI) integration for the lending protocol's core deposit and withdraw functionality using native Solana instructions. The protocol implements a vault-style system where users deposit underlying tokens and receive fTokens (share tokens) in return.

### Deployed address

#### Devnet

| Program           | Address                                        | link                                                                                                                |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| LENDING_PROGRAM   | `7tjE28izRUjzmxC1QNXnNwcc4N82CNYCexf3k8mw67s3` | [lending_devnet](https://explorer.solana.com/address/7tjE28izRUjzmxC1QNXnNwcc4N82CNYCexf3k8mw67s3?cluster=devnet)   |
| LIQUIDITY_PROGRAM | `5uDkCoM96pwGYhAUucvCzLfm5UcjVRuxz6gH81RnRBmL` | [liquidity_devnet](https://explorer.solana.com/address/5uDkCoM96pwGYhAUucvCzLfm5UcjVRuxz6gH81RnRBmL?cluster=devnet) |

#### Staging mainnet

| Program           | Address                                       | link                                                                                                 |
| ----------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| LENDING_PROGRAM   | `jup3YeL8QhtSx1e253b2FDvsMNC87fDrgQZivbrndc9` | [lending_mainnet](https://explorer.solana.com/address/jup3YeL8QhtSx1e253b2FDvsMNC87fDrgQZivbrndc9)   |
| LIQUIDITY_PROGRAM | `jupeiUmn818Jg1ekPURTpr4mFo29p46vygyykFJ3wZC` | [liquidity_mainnet](https://explorer.solana.com/address/jupeiUmn818Jg1ekPURTpr4mFo29p46vygyykFJ3wZC) |

## Core CPI Functions

### 1. Deposit Flow

- `deposit` - Deposit assets, receive fTokens

### 2. Withdraw Flow

- `withdraw` - Withdraw assets by burning fTokens

---

## Deposit CPI Integration

### Function Discriminators

```rust
fn get_deposit_discriminator() -> Vec<u8> {
    // discriminator = sha256("global:deposit")[0..8]
    vec![242, 35, 198, 137, 82, 225, 242, 182]
}
```

### Deposit CPI Struct

```rust
use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    account_info::AccountInfo,
    instruction::{AccountMeta, Instruction},
    program::invoke,
};

pub struct DepositParams<'info> {
    // User accounts
    pub signer: AccountInfo<'info>,
    pub depositor_token_account: AccountInfo<'info>,
    pub recipient_token_account: AccountInfo<'info>,

    pub mint: AccountInfo<'info>,

    // Protocol accounts
    pub lending_admin: AccountInfo<'info>,
    pub lending: AccountInfo<'info>,
    pub f_token_mint: AccountInfo<'info>,

    // Liquidity protocol accounts
    pub supply_token_reserves_liquidity: AccountInfo<'info>,
    pub lending_supply_position_on_liquidity: AccountInfo<'info>,
    pub rate_model: AccountInfo<'info>,
    pub vault: AccountInfo<'info>,
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
```

### Deposit Implementation

```rust
impl<'info> DepositParams<'info> {
    pub fn deposit(&self, amount: u64) -> Result<()> {
        let mut instruction_data = get_deposit_discriminator();
        instruction_data.extend_from_slice(&amount.to_le_bytes());

        let account_metas = vec![
            // signer (mutable, signer)
            AccountMeta::new(*self.signer.key, true),
            // depositor_token_account (mutable)
            AccountMeta::new(*self.depositor_token_account.key, false),
            // recipient_token_account (mutable)
            AccountMeta::new(*self.recipient_token_account.key, false),
            // mint
            AccountMeta::new_readonly(*self.mint.key, false),
            // lending_admin (readonly)
            AccountMeta::new_readonly(*self.lending_admin.key, false),
            // lending (mutable)
            AccountMeta::new(*self.lending.key, false),
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
                self.depositor_token_account.clone(),
                self.recipient_token_account.clone(),
                self.mint.clone(),
                self.lending_admin.clone(),
                self.lending.clone(),
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
            ],
        )
        .map_err(|_| ErrorCodes::CpiToLendingProgramFailed.into())
    }
}
```

> Full snippet available [here](../../references/earn/deposit.rs)

### Deposit Account Explanations

| Account                                | Purpose                         | Mutability | Notes                                 |
| -------------------------------------- | ------------------------------- | ---------- | ------------------------------------- |
| `signer`                               | User performing deposit         | Mutable    | Signs the transaction                 |
| `depositor_token_account`              | User's underlying token account | Mutable    | Source of tokens to deposit           |
| `recipient_token_account`              | User's fToken account           | Mutable    | Destination for minted fTokens        |
| `mint`                                 | Underlying token mint           | Immutable  | The token being deposited             |
| `lending_admin`                        | Protocol configuration          | Immutable  | Contains liquidity program reference  |
| `lending`                              | Pool-specific configuration     | Mutable    | Links mint to fToken mint             |
| `f_token_mint`                         | fToken mint account             | Mutable    | fTokens minted to supply              |
| `supply_token_reserves_liquidity`      | Liquidity reserves              | Mutable    | Liquidity protocol token reserves     |
| `lending_supply_position_on_liquidity` | Lending position                | Mutable    | Protocol's position in liquidity pool |
| `rate_model`                           | Interest rate calculation       | Immutable  | Determines interest rates             |
| `vault`                                | Protocol token vault            | Mutable    | Destination of deposited tokens       |
| `liquidity`                            | Liquidity protocol PDA          | Mutable    | Manages liquidity operations          |
| `liquidity_program`                    | Liquidity program reference     | Mutable    | External liquidity program            |
| `rewards_rate_model`                   | Rewards calculation             | Immutable  | Determines fToken exchange rate       |

---

## Withdraw CPI Integration

### Function Discriminators

```rust
fn get_withdraw_discriminator() -> Vec<u8> {
    // discriminator = sha256("global:withdraw")[0..8]
    vec![183, 18, 70, 156, 148, 109, 161, 34]
}
```

### Withdraw CPI Struct

```rust
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
```

### Withdraw Implementation

```rust
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
```

> Full snippet available [here](../../references/earn/withdraw.rs)

### Withdraw Account Explanations

| Account                                | Purpose                         | Mutability | Notes                                 |
| -------------------------------------- | ------------------------------- | ---------- | ------------------------------------- |
| `signer`                               | User performing withdrawal      | Mutable    | Must own fTokens to burn              |
| `owner_token_account`                  | User's fToken account           | Mutable    | Source of fTokens to burn             |
| `recipient_token_account`              | User's underlying token account | Mutable    | Destination for withdrawn tokens      |
| `lending_admin`                        | Protocol configuration          | Immutable  | Contains liquidity program reference  |
| `lending`                              | Pool-specific configuration     | Mutable    | Links mint to fToken mint             |
| `mint`                                 | Underlying token mint           | Immutable  | The token being withdrawn             |
| `f_token_mint`                         | fToken mint account             | Mutable    | fTokens burned from supply            |
| `supply_token_reserves_liquidity`      | Liquidity reserves              | Mutable    | Liquidity protocol token reserves     |
| `lending_supply_position_on_liquidity` | Lending position                | Mutable    | Protocol's position in liquidity pool |
| `rate_model`                           | Interest rate calculation       | Immutable  | Determines interest rates             |
| `vault`                                | Protocol token vault            | Mutable    | Source of withdrawn tokens            |
| `claim_account`                        | Claim processing account        | Mutable    | Handles withdrawal claims             |
| `liquidity`                            | Liquidity protocol PDA          | Mutable    | Manages liquidity operations          |
| `liquidity_program`                    | Liquidity program reference     | Mutable    | External liquidity program            |
| `rewards_rate_model`                   | Rewards calculation             | Immutable  | Determines fToken exchange rate       |

---

## Key Implementation Notes

### 1. Account Derivation

Most accounts follow standard PDA derivation patterns:

- Lending PDA: `[LENDING_SEED, mint.key(), f_token_mint.key()]`
- fToken Mint: `[F_TOKEN_MINT_SEED, mint.key()]`
- Lending Admin: `[LENDING_ADMIN_SEED]`

### 2. Special Considerations

- **Amount = u64::MAX**: Deposits/withdraws the entire balance
- **Account Creation**: ATA accounts are created automatically when needed (`init_if_needed`)
- **Liquidity Integration**: The protocol integrates with an underlying liquidity protocol
- **Claim Account**: Only present in withdraw operations for processing withdrawal claims

### 3. Error Handling

Common errors to handle:

- `FTokenMinAmountOut`: Slippage protection triggered
- `FTokenMaxAmount`: Maximum amount exceeded
- `FTokenOnlyAuth`: Unauthorized operation
- `FTokenOnlyRebalancer`: Rebalancer-only operation
- `CpiToLendingProgramFailed`: CPI call failed

### 4. Return Values

- `deposit()` returns shares minted
- `withdraw()` returns shares burned

---
