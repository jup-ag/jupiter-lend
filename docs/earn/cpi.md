# Jupiter Lend Earn CPI Documentation

## Overview

This documentation covers Cross-Program Invocation (CPI) integration for the lending protocol's core deposit and withdraw functionality using native Solana instructions. The protocol implements a vault-style system where users deposit underlying tokens and receive fTokens (share tokens) in return.

The account lists and instruction layouts below match the `lending` IDL in [`target/idl/lending.json`](../../target/idl/lending.json) (version 0.1.9).

### Deployed address

#### Mainnet

| Program           | Address                                       | link                                                                                                 |
| ----------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| LENDING_PROGRAM   | `jup3YeL8QhtSx1e253b2FDvsMNC87fDrgQZivbrndc9` | [lending_mainnet](https://explorer.solana.com/address/jup3YeL8QhtSx1e253b2FDvsMNC87fDrgQZivbrndc9)   |
| LIQUIDITY_PROGRAM | `jupeiUmn818Jg1ekPURTpr4mFo29p46vygyykFJ3wZC` | [liquidity_mainnet](https://explorer.solana.com/address/jupeiUmn818Jg1ekPURTpr4mFo29p46vygyykFJ3wZC) |

These are the program IDs of the `main` market and the addresses in the IDL. The SDK's `market` parameter also selects the `ethena` market, which are separate deployments with their own program IDs.

#### Devnet

| Program           | Address                                        | link                                                                                                                |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| LENDING_PROGRAM   | `7tjE28izRUjzmxC1QNXnNwcc4N82CNYCexf3k8mw67s3` | [lending_devnet](https://explorer.solana.com/address/7tjE28izRUjzmxC1QNXnNwcc4N82CNYCexf3k8mw67s3?cluster=devnet)   |
| LIQUIDITY_PROGRAM | `5uDkCoM96pwGYhAUucvCzLfm5UcjVRuxz6gH81RnRBmL` | [liquidity_devnet](https://explorer.solana.com/address/5uDkCoM96pwGYhAUucvCzLfm5UcjVRuxz6gH81RnRBmL?cluster=devnet) |

> The devnet programs were last deployed in May 2025 and do not match the current IDL. The `@jup-ag/lend` SDK does not target devnet. Test against mainnet, or a local validator with the mainnet programs cloned.

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
    program::{get_return_data, invoke},
};

#[error_code]
pub enum ErrorCodes {
    #[msg("CPI_TO_LENDING_PROGRAM_FAILED")]
    CpiToLendingProgramFailed,
    #[msg("INVALID_RETURN_DATA")]
    InvalidReturnData,
}

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
    pub lending_program: AccountInfo<'info>,
}
```

### Deposit Implementation

```rust
impl<'info> DepositParams<'info> {
    /// Deposits `assets` of the underlying token (native decimals) and returns
    /// the fToken shares minted (fToken decimals = underlying decimals).
    /// `assets == u64::MAX` deposits the full `depositor_token_account` balance.
    pub fn deposit(&self, assets: u64) -> Result<u64> {
        let mut instruction_data = get_deposit_discriminator();
        instruction_data.extend_from_slice(&assets.to_le_bytes());

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
                self.lending_program.clone(),
            ],
        )
        .map_err(|_| error!(ErrorCodes::CpiToLendingProgramFailed))?;

        // `deposit` returns the shares minted as a Borsh-encoded u64.
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
```

> Full snippet available [here](../../references/earn/deposit.rs)

### Deposit Account Explanations

| Account                                | Purpose                         | Mutability | Notes                                                    |
| -------------------------------------- | ------------------------------- | ---------- | -------------------------------------------------------- |
| `signer`                               | User performing deposit         | Mutable    | Signs the transaction                                    |
| `depositor_token_account`              | User's underlying token account | Mutable    | Source of tokens; must be owned by `signer`              |
| `recipient_token_account`              | User's fToken account           | Mutable    | Receives minted fTokens; must be owned by `signer`       |
| `mint`                                 | Underlying token mint           | Immutable  | The token being deposited                                |
| `lending_admin`                        | Protocol configuration          | Immutable  | Contains liquidity program reference                     |
| `lending`                              | Pool-specific configuration     | Mutable    | Links mint to fToken mint                                |
| `f_token_mint`                         | fToken mint account             | Mutable    | fTokens minted to supply                                 |
| `supply_token_reserves_liquidity`      | Liquidity reserves              | Mutable    | Liquidity protocol token reserves                        |
| `lending_supply_position_on_liquidity` | Lending position                | Mutable    | Protocol's position in liquidity pool                    |
| `rate_model`                           | Interest rate calculation       | Immutable  | Determines interest rates                                |
| `vault`                                | Protocol token vault            | Mutable    | Destination of deposited tokens                          |
| `liquidity`                            | Liquidity protocol PDA          | Mutable    | Manages liquidity operations                             |
| `liquidity_program`                    | Liquidity program reference     | Immutable  | External liquidity program                               |
| `rewards_rate_model`                   | Rewards calculation             | Immutable  | Determines fToken exchange rate                          |
| `token_program`                        | SPL Token or Token-2022 program | Immutable  | Must own `mint`                                          |
| `associated_token_program`             | Associated Token program        | Immutable  | Optional in the IDL; pass the ATA program                |
| `system_program`                       | System program                  | Immutable  |                                                          |

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
```

### Withdraw Implementation

```rust
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
```

> Full snippet available [here](../../references/earn/withdraw.rs)

### Withdraw Account Explanations

| Account                                | Purpose                         | Mutability | Notes                                                        |
| -------------------------------------- | ------------------------------- | ---------- | ------------------------------------------------------------ |
| `signer`                               | User performing withdrawal      | Mutable    | Must own fTokens to burn                                     |
| `owner_token_account`                  | User's fToken account           | Mutable    | Source of fTokens to burn; must be owned by `signer`         |
| `recipient_token_account`              | User's underlying token account | Mutable    | Receives withdrawn tokens; must be owned by `signer`         |
| `lending_admin`                        | Protocol configuration          | Immutable  | Contains liquidity program reference                         |
| `lending`                              | Pool-specific configuration     | Mutable    | Links mint to fToken mint                                    |
| `mint`                                 | Underlying token mint           | Immutable  | The token being withdrawn                                    |
| `f_token_mint`                         | fToken mint account             | Mutable    | fTokens burned from supply                                   |
| `supply_token_reserves_liquidity`      | Liquidity reserves              | Mutable    | Liquidity protocol token reserves                            |
| `lending_supply_position_on_liquidity` | Lending position                | Mutable    | Protocol's position in liquidity pool                        |
| `rate_model`                           | Interest rate calculation       | Immutable  | Determines interest rates                                    |
| `vault`                                | Protocol token vault            | Mutable    | Source of withdrawn tokens                                   |
| `claim_account`                        | Liquidity claim account         | Mutable    | Optional. Not used by `withdraw`; pass the lending program ID |
| `liquidity`                            | Liquidity protocol PDA          | Mutable    | Manages liquidity operations                                 |
| `liquidity_program`                    | Liquidity program reference     | Immutable  | External liquidity program                                   |
| `rewards_rate_model`                   | Rewards calculation             | Immutable  | Determines fToken exchange rate                              |
| `token_program`                        | SPL Token or Token-2022 program | Immutable  | Must own `mint`                                              |
| `associated_token_program`             | Associated Token program        | Immutable  | Optional in the IDL; pass the ATA program                    |
| `system_program`                       | System program                  | Immutable  |                                                              |

---

## Key Implementation Notes

### 1. Account Derivation

PDAs of the lending program:

- Lending PDA: `[b"lending", mint.key(), f_token_mint.key()]`
- fToken Mint: `[b"f_token_mint", mint.key()]`
- Lending Admin: `[b"lending_admin"]`

### 2. Optional Accounts

The IDL marks `associated_token_program` (deposit and withdraw) and `claim_account` (withdraw) as optional. Optional accounts keep their position in the account list. To pass `None`, put the lending program ID in that slot as a read-only account and include the lending program's `AccountInfo` in the `invoke` account list, as the withdraw snippet does. The `@jup-ag/lend` SDK passes the claim PDA instead; the program accepts either because `withdraw` never transfers through the claim account.

### 3. Special Considerations

- **Amounts** are in the underlying token's native decimals. fToken shares use the same number of decimals.
- **Amount = u64::MAX**: `deposit` deposits the full `depositor_token_account` balance. `withdraw` withdraws the asset value of the full `owner_token_account` fToken balance, rounded down. It does not check the liquidity layer's withdrawal limit, so check the maximum withdrawable amount first.
- **Token accounts are not created by the program**: `depositor_token_account`, `recipient_token_account` and `owner_token_account` must already exist and must be owned by `signer`. Create them before the CPI. The SDK's `includeATASetup` option does this for SDK users.
- **Writable accounts**: request write access only where the tables above say Mutable. `liquidity_program` is read-only. Requesting write access to a program account fails the CPI with a privilege-escalation error unless the outer transaction marks it writable.
- **Liquidity Integration**: The protocol integrates with an underlying liquidity protocol

### 4. Rounding

- `deposit`: shares minted = deposited assets × 1e12 / token exchange price, rounded down (in the protocol's favour). A deposit that rounds to 0 shares fails with `FTokenDepositInsignificant`.
- `withdraw`: shares burned = withdrawn assets × 1e12 / token exchange price, rounded up (in the protocol's favour).

### 5. Slippage-Protected Variants

These instructions take the same accounts as `deposit` and `withdraw` and add one `u64` argument after the amount.

| Instruction                     | Discriminator                                | Args                                    | Fails with           | Returns              |
| ------------------------------- | -------------------------------------------- | --------------------------------------- | -------------------- | -------------------- |
| `deposit_with_min_amount_out`   | `[116, 144, 16, 97, 118, 109, 40, 119]`      | `assets: u64`, `min_amount_out: u64`    | `FTokenMinAmountOut` if shares minted < `min_amount_out` | Nothing |
| `withdraw_with_max_shares_burn` | `[47, 197, 183, 171, 239, 18, 245, 171]`     | `amount: u64`, `max_shares_burn: u64`   | `FTokenMaxAmount` if shares burned > `max_shares_burn` (0 disables the check) | Shares burned (`u64`) |

### 6. Error Handling

Common errors to handle:

- `FTokenDepositInsignificant`: Deposit too small to mint at least one share
- `FTokenMinAmountOut`: Slippage protection triggered (`deposit_with_min_amount_out`)
- `FTokenMaxAmount`: Maximum shares to burn exceeded (`withdraw_with_max_shares_burn`)
- `ConstraintHasOne` (Anchor): `liquidity_program`, `mint` or `f_token_mint` does not match the `lending_admin` / `lending` accounts
- `CpiToLendingProgramFailed`: CPI call failed (defined by the caller in the snippets)
- `InvalidReturnData`: Return data missing, not set by the lending program, or not a `u64` (defined by the caller in the snippets)

### 7. Return Values

Both instructions return a Borsh-encoded `u64` through Solana return data. The snippets read it with `get_return_data()`.

- `deposit()` returns shares minted
- `withdraw()` returns shares burned

---
