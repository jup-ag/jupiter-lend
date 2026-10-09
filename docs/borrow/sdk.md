# Jupiter Vaults SDK Documentation

## Overview

The Jupiter Vaults SDK provides a TypeScript interface for interacting with the Jupiter Vaults protocol. This documentation covers the main integration approach: getting instruction objects and account contexts for vault operations including deposit, withdraw, borrow, and payback through a single `operate` function.

This guide matches `@jup-ag/lend` 0.4.0. `getOperateIx` supports standard (T1) vaults only and throws for smart (DEX) vaults.

## Installation

```bash
npm install @jup-ag/lend
```

## Setup

```typescript
import {
  Connection,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { getOperateIx } from "@jup-ag/lend/borrow";
import { BN } from "bn.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const signer = new PublicKey("YOUR_SIGNER_PUBLIC_KEY");

// Example vault configuration
const vaultId = 1; // Your vault ID
const positionId = 12345; // Your position NFT ID (obtained after minting position NFT)
```

---

## Core Operation Function

### Getting Operate Instruction

Use `getOperateIx()` to get transaction instructions and all necessary account data for vault operations. The function returns multiple instructions that must be executed in order using **v0 (versioned) transactions**:

```typescript
// Get operate instruction with all accounts and data
const {
  ixs,
  addressLookupTableAccounts,
  nftId,
  accounts,
  remainingAccounts,
  remainingAccountsIndices,
} = await getOperateIx({
  colAmount: new BN(1000000000), // Collateral amount in supply-token native decimals (1,000 tokens at 6 decimals)
  debtAmount: new BN(500000000), // Debt amount in borrow-token native decimals (500 tokens at 6 decimals)
  connection,
  positionId: nftId, // Position NFT ID (to create a new position pass it as 0)
  signer: publicKey, // Signer public key
  vaultId: vault_id, // Vault ID
  market: "main", // optional, defaults to "main"
});

// IMPORTANT: Must use v0 (versioned) transaction
const latestBlockhash = await connection.getLatestBlockhash();

// Create transaction message with all instructions in order
const messageV0 = new TransactionMessage({
  payerKey: signer,
  recentBlockhash: latestBlockhash.blockhash,
  instructions: ixs, // All instructions must be added in order
}).compileToV0Message(addressLookupTableAccounts); // Include lookup table accounts

// Create versioned transaction
const versionedTransaction = new VersionedTransaction(messageV0);

// Sign and send versioned transaction
versionedTransaction.sign([signerKeypair]);
const signature = await connection.sendTransaction(versionedTransaction);
console.log("Transaction ID:", signature);
```

### Parameters

| Parameter            | Default    | Description                                                                                                                  |
| -------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `vaultId`            | -          | Vault ID                                                                                                                     |
| `positionId`         | -          | Position NFT ID. `0` creates a new position in the same transaction                                                          |
| `colAmount`          | -          | Collateral change in supply-token native decimals. Positive = deposit, negative = withdraw                                   |
| `debtAmount`         | -          | Debt change in borrow-token native decimals. Positive = borrow, negative = payback                                           |
| `signer`             | -          | Signer and payer                                                                                                             |
| `connection`         | -          | Solana connection                                                                                                            |
| `market`             | `"main"`   | `"main"` or `"ethena"`. Each market is a separate deployment                                                     |
| `recipient`          | signer     | Receives withdrawn and borrowed tokens                                                                                       |
| `positionOwner`      | signer     | Owner of the position NFT, used to derive `positionTokenAccount`                                                             |
| `colAmountMode`      | `"exact"`  | `"max"` withdraws all collateral; `colAmount` must then be zero or negative                                                  |
| `debtAmountMode`     | `"exact"`  | `"max"` pays back all debt; `debtAmount` must then be zero or negative and is used as the wrap budget for SOL                |
| `includeATASetup`    | `false`    | Prepends create-ATA instructions for the supply and borrow mints (for the signer, and for `recipient` if set)                |
| `includeWrapSol`     | `false`    | Wraps and unwraps native SOL when either mint is wrapped SOL                                                                 |
| `wrapBufferLamports` | 0.01 SOL   | Extra lamports wrapped for a `"max"` SOL payback; the unused part is returned by the unwrap                                  |

### Automatic Position Creation

If `positionId = 0` is provided, the function will automatically batch position creation instructions:

```typescript
// Create new position and perform operation in one transaction
const { ixs, addressLookupTableAccounts, nftId } = await getOperateIx({
  colAmount: new BN(1000000000),
  debtAmount: new BN(0),
  connection,
  positionId: 0, // 0 = auto-create position
  signer: publicKey,
  vaultId: 1,
});

console.log("New position NFT ID:", nftId); // ID of the created position
console.log("Instructions count:", ixs.length); // Will include position creation + setup + operate

// Must use v0 transaction with lookup tables
const latestBlockhash = await connection.getLatestBlockhash();
const messageV0 = new TransactionMessage({
  payerKey: signer,
  recentBlockhash: latestBlockhash.blockhash,
  instructions: ixs,
}).compileToV0Message(addressLookupTableAccounts);

const versionedTransaction = new VersionedTransaction(messageV0);
versionedTransaction.sign([signerKeypair]);

const signature = await connection.sendTransaction(versionedTransaction);
```

To create a position on its own, `getInitPositionIx({ vaultId, connection, signer, market })` returns `{ ix, nftId }`.

---

## Operation Types

Amounts are in each token's native decimals. The examples assume 6-decimal supply and borrow tokens.

### 1. Deposit Only

```typescript
// Deposit 1000 supply tokens (with automatic position creation if needed)
const { ixs, nftId } = await getOperateIx({
  colAmount: new BN(1000000000), // Positive = deposit
  debtAmount: new BN(0), // No debt change
  connection,
  positionId: 0, // Will create new position automatically
  signer: publicKey,
  vaultId: 1,
});

console.log("Position NFT ID:", nftId); // Will be the new or existing position ID
```

### 2. Withdraw Only

```typescript
// Withdraw 500 supply tokens
const { ixs } = await getOperateIx({
  colAmount: new BN(-500000000), // Negative = withdraw
  debtAmount: new BN(0), // No debt change
  connection,
  positionId: nft.id,
  signer: publicKey,
  vaultId: nft.vault.id,
});
```

### 3. Borrow Only

```typescript
// Borrow 250 borrow tokens
const { ixs } = await getOperateIx({
  colAmount: new BN(0), // No collateral change
  debtAmount: new BN(250000000), // Positive = borrow
  connection,
  positionId: nft.id,
  signer: publicKey,
  vaultId: nft.vault.id,
});
```

### 4. Payback Only

```typescript
// Payback 100 borrow tokens
const { ixs } = await getOperateIx({
  colAmount: new BN(0), // No collateral change
  debtAmount: new BN(-100000000), // Negative = payback
  connection,
  positionId: nft.id,
  signer: publicKey,
  vaultId: nft.vault.id,
});
```

### 5. Deposit + Borrow (Leverage)

```typescript
// Deposit 1000 tokens and borrow 400 tokens
const { ixs } = await getOperateIx({
  colAmount: new BN(1000000000), // Deposit collateral
  debtAmount: new BN(400000000), // Borrow debt
  connection,
  positionId: nft.id,
  signer: publicKey,
  vaultId: nft.vault.id,
});
```

### 6. Payback + Withdraw (Deleverage)

```typescript
// Payback 200 tokens and withdraw 300 tokens
const { ixs } = await getOperateIx({
  colAmount: new BN(-300000000), // Withdraw collateral
  debtAmount: new BN(-200000000), // Payback debt
  connection,
  positionId: nft.id,
  signer: publicKey,
  vaultId: nft.vault.id,
});
```

### 7. Max Withdraw

```typescript
// Withdraw all available collateral
const { ixs } = await getOperateIx({
  colAmount: new BN(0), // ignored in "max" mode; must be zero or negative
  colAmountMode: "max", // sends i128::MIN
  debtAmount: new BN(0),
  connection,
  positionId: nft.id,
  signer: publicKey,
  vaultId: nft.vault.id,
});
```

### 8. Max Payback

```typescript
// Payback all debt
const { ixs } = await getOperateIx({
  colAmount: new BN(0),
  debtAmount: new BN(-100000000), // approximate debt; used only to size a SOL wrap
  debtAmountMode: "max", // sends i128::MIN
  connection,
  positionId: nft.id,
  signer: publicKey,
  vaultId: nft.vault.id,
});
```

Passing `new BN("-170141183460469231731687303715884105728")` (i128::MIN) directly as `colAmount` or `debtAmount` has the same on-chain effect, but cannot be combined with `includeWrapSol`.

---

## Return Object Properties

The `getOperateIx()` function returns an object with the following properties:

```typescript
interface OperateIxResponse {
  ixs: TransactionInstruction[]; // All instructions, in order
  operateIx: TransactionInstruction; // The operate instruction (also inside ixs)
  addressLookupTableAccounts: AddressLookupTableAccount[]; // Vault lookup table, if it has one
  addressLookupTableAddresses: PublicKey[]; // Address of the vault lookup table, if it has one
  nftId: number; // Position NFT ID
  accounts: OperateAccounts; // All account addresses used in the operation
  remainingAccounts: { pubkey: PublicKey; isWritable: boolean; isSigner: boolean }[]; // Oracle sources, branches, tick has debt arrays
  remainingAccountsIndices: number[]; // [oracle sources, branches, tick has debt arrays] counts
}

interface OperateAccounts {
  signer: PublicKey;
  signerSupplyTokenAccount: PublicKey;
  signerBorrowTokenAccount: PublicKey;
  recipient: PublicKey | null; // null when no recipient is passed
  recipientBorrowTokenAccount: PublicKey | null;
  recipientSupplyTokenAccount: PublicKey | null;
  vaultConfig: PublicKey;
  vaultState: PublicKey;
  supplyToken: PublicKey;
  borrowToken: PublicKey;
  oracle: PublicKey;
  position: PublicKey;
  positionTokenAccount: PublicKey;
  currentPositionTick: PublicKey;
  finalPositionTick: PublicKey;
  currentPositionTickId: PublicKey;
  finalPositionTickId: PublicKey;
  newBranch: PublicKey;
  supplyTokenReservesLiquidity: PublicKey;
  borrowTokenReservesLiquidity: PublicKey;
  vaultSupplyPositionOnLiquidity: PublicKey;
  vaultBorrowPositionOnLiquidity: PublicKey;
  supplyRateModel: PublicKey;
  borrowRateModel: PublicKey;
  vaultSupplyTokenAccount: PublicKey;
  vaultBorrowTokenAccount: PublicKey;
  supplyTokenClaimAccount: null; // the SDK always uses direct transfers
  borrowTokenClaimAccount: null;
  liquidity: PublicKey;
  liquidityProgram: PublicKey;
  oracleProgram: PublicKey;
  supplyTokenProgram: PublicKey;
  borrowTokenProgram: PublicKey;
  systemProgram: PublicKey;
}
```

`associatedTokenProgram` is not part of `accounts`; it is optional in the IDL, and Anchor resolves its fixed address.

---

## CPI Integration Usage

For Anchor programs that need to make CPI calls to Jupiter Vaults, you need to handle the setup instructions separately from the final operate instruction:

```typescript
import { ASSOCIATED_TOKEN_PROGRAM_ID } from "@solana/spl-token";

// In your frontend/client code
const {
  ixs,
  operateIx,
  accounts,
  remainingAccounts,
  remainingAccountsIndices,
  addressLookupTableAccounts,
} = await getOperateIx({
  colAmount: new BN(1000000000),
  debtAmount: new BN(500000000),
  connection,
  positionId: nft.id,
  signer: userPublicKey, // the account that signs the CPI (e.g. your program's PDA)
  vaultId: nft.vault.id,
});

// IMPORTANT: For CPI integration, you need to:
// 1. Execute the instructions before `operateIx` (setup) in your transaction
// 2. Replace `operateIx` with your program instruction that makes the CPI call
// 3. Keep the instructions after `operateIx` (SOL unwrap, if requested)
const operateIndex = ixs.indexOf(operateIx);
const setupInstructions = ixs.slice(0, operateIndex);
const postInstructions = ixs.slice(operateIndex + 1);

// Your program instruction that makes the CPI call
const yourInstruction = await program.methods
  .yourVaultOperateMethod(colAmount, debtAmount, remainingAccountsIndices)
  .accounts({
    // Your program accounts
    userAccount: userAccount,

    // Jupiter Vaults accounts (from context) - use accounts from the operate instruction
    signer: accounts.signer,
    signerSupplyTokenAccount: accounts.signerSupplyTokenAccount,
    signerBorrowTokenAccount: accounts.signerBorrowTokenAccount,
    recipient: accounts.recipient,
    recipientBorrowTokenAccount: accounts.recipientBorrowTokenAccount,
    recipientSupplyTokenAccount: accounts.recipientSupplyTokenAccount,
    vaultConfig: accounts.vaultConfig,
    vaultState: accounts.vaultState,
    supplyToken: accounts.supplyToken,
    borrowToken: accounts.borrowToken,
    oracle: accounts.oracle,
    position: accounts.position,
    positionTokenAccount: accounts.positionTokenAccount,
    currentPositionTick: accounts.currentPositionTick,
    finalPositionTick: accounts.finalPositionTick,
    currentPositionTickId: accounts.currentPositionTickId,
    finalPositionTickId: accounts.finalPositionTickId,
    newBranch: accounts.newBranch,
    supplyTokenReservesLiquidity: accounts.supplyTokenReservesLiquidity,
    borrowTokenReservesLiquidity: accounts.borrowTokenReservesLiquidity,
    vaultSupplyPositionOnLiquidity: accounts.vaultSupplyPositionOnLiquidity,
    vaultBorrowPositionOnLiquidity: accounts.vaultBorrowPositionOnLiquidity,
    supplyRateModel: accounts.supplyRateModel,
    borrowRateModel: accounts.borrowRateModel,
    vaultSupplyTokenAccount: accounts.vaultSupplyTokenAccount,
    vaultBorrowTokenAccount: accounts.vaultBorrowTokenAccount,
    liquidity: accounts.liquidity,
    liquidityProgram: accounts.liquidityProgram,
    oracleProgram: accounts.oracleProgram,
    supplyTokenProgram: accounts.supplyTokenProgram,
    borrowTokenProgram: accounts.borrowTokenProgram,
    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
    systemProgram: accounts.systemProgram,

    vaultsProgram: new PublicKey(
      "jupr81YtYssSyPt8jbnGuiWon5f6x9TcDEFxYe3Bdzi"
    ), // main market
  })
  .remainingAccounts(remainingAccounts)
  .instruction();

// v0 transaction: setup instructions, your instruction, then any post instructions
const latestBlockhash = await connection.getLatestBlockhash();

const messageV0 = new TransactionMessage({
  payerKey: userPublicKey,
  recentBlockhash: latestBlockhash.blockhash,
  instructions: [...setupInstructions, yourInstruction, ...postInstructions],
}).compileToV0Message(addressLookupTableAccounts);

const versionedTx = new VersionedTransaction(messageV0);
```

### CPI Setup Instructions

The setup instructions handle:

- Position creation, when `positionId` is 0
- Token account creation, only when `includeATASetup` is set
- SOL wrapping, only when `includeWrapSol` is set
- Tick, branch and tick-ID account initialization (`init_tick`, `init_branch`, `init_tick_id_liquidation`) when the operation needs them

**Important**: These setup instructions must be executed before your CPI call, as they prepare the program state for the vault operation.

---

## Account Explanations

### Core Vault Accounts

| Account                       | Purpose                                           |
| ----------------------------- | ------------------------------------------------- |
| `signer`                      | User's wallet public key performing the operation |
| `signerSupplyTokenAccount`    | User's supply token account (source for deposits) |
| `signerBorrowTokenAccount`    | User's borrow token account (source for paybacks) |
| `recipient`                   | Destination wallet for withdrawals/borrows        |
| `recipientSupplyTokenAccount` | Destination for withdrawn supply tokens           |
| `recipientBorrowTokenAccount` | Destination for borrowed tokens                   |

### Vault Configuration

| Account       | Purpose                                       |
| ------------- | --------------------------------------------- |
| `vaultConfig` | Vault configuration PDA containing parameters |
| `vaultState`  | Vault state PDA with current liquidity data   |
| `supplyToken` | Supply token mint address                     |
| `borrowToken` | Borrow token mint address                     |
| `oracle`      | Price oracle account for the vault            |

### Position Management

| Account                 | Purpose                                             |
| ----------------------- | --------------------------------------------------- |
| `position`              | User's position PDA containing debt/collateral data |
| `positionTokenAccount`  | User's position NFT token account                   |
| `currentPositionTick`   | Current tick where position is located              |
| `finalPositionTick`     | Final tick after operation                          |
| `currentPositionTickId` | Current position ID within tick                     |
| `finalPositionTickId`   | Final position ID within tick                       |
| `newBranch`             | Branch account for tick organization                |

### Liquidity Integration

| Account                          | Purpose                                       |
| -------------------------------- | --------------------------------------------- |
| `supplyTokenReservesLiquidity`   | Underlying liquidity protocol supply reserves |
| `borrowTokenReservesLiquidity`   | Underlying liquidity protocol borrow reserves |
| `vaultSupplyPositionOnLiquidity` | Vault's supply position in liquidity protocol |
| `vaultBorrowPositionOnLiquidity` | Vault's borrow position in liquidity protocol |
| `supplyRateModel`                | Supply interest rate model                    |
| `borrowRateModel`                | Borrow interest rate model                    |
| `vaultSupplyTokenAccount`        | Vault's supply token holding account          |
| `vaultBorrowTokenAccount`        | Vault's borrow token holding account          |
| `liquidity`                      | Main liquidity protocol PDA                   |
| `liquidityProgram`               | Liquidity protocol program ID                 |

### Remaining Accounts Structure

The `remainingAccountsIndices` array contains three values:

- `[0]` = Number of oracle source accounts
- `[1]` = Number of branch accounts
- `[2]` = Number of tick has debt array accounts

The `remainingAccounts` array is ordered as:

1. Oracle sources (0 to indices[0]) - read-only
2. Branch accounts (indices[0] to indices[0] + indices[1]) - writable
3. Tick has debt arrays (indices[0] + indices[1] to indices[0] + indices[1] + indices[2]) - writable

---

## Important Notes

### Amounts and Rounding

- `colAmount` and `debtAmount` are in each token's native decimals. Do not scale them to 1e9; the vault does that internally (exactly, by 10^(9 − decimals)).
- Use `new BN('number')` for amounts to handle large numbers
- Positive values = deposit/borrow, Negative values = withdraw/payback
- Use `colAmountMode: "max"` / `debtAmountMode: "max"` for max withdraw/payback operations
- Withdrawn and borrowed amounts are rounded down by the program (in the protocol's favour).
- Deposits and paybacks are rounded up by one native unit (in the protocol's favour). A deposit of exactly the signer's full token balance is not rounded up. For a payback of exactly the signer's full borrow-token balance (non-SOL), the SDK reduces the payback by one unit so the transaction does not fail.

### Position Requirements

- Position NFT can be created automatically by passing `positionId = 0` parameter
- If `positionId` is provided, it will use the existing position
- Position NFT ownership is required for withdraw/borrow operations
- Anyone can deposit to any position or payback debt for any position

### Instructions Batching

- The `ixs` array contains multiple instructions that must be executed in order
- Instructions include: optional position creation, optional token account creation and SOL wrapping, vault account setup, the operate call, and an optional SOL unwrap after it
- All instructions are required for proper vault operation
- For CPI integration, use `operateIx` to split `ixs`: run the instructions before it, replace it with your CPI instruction, and keep the instructions after it

### Transaction Requirements

- **Must use v0 (versioned) transactions** - Regular transactions are not supported
- Pass `addressLookupTableAccounts` to `compileToV0Message`
- Multiple instructions are returned and must be executed in order
- For CPI integration, execute setup instructions first, then make your CPI call with the operate instruction accounts

### Error Handling

Common errors to handle:

- Invalid position ID or vault ID
- Smart (DEX) vault passed to `getOperateIx`
- Insufficient collateral for borrow operations
- Position liquidation state conflicts
- Network connectivity issues

---

## Position NFT Creation

Position NFTs are automatically created when `positionId` is 0:

```typescript
// Create new position and deposit in one transaction
const { ixs, nftId, accounts } = await getOperateIx({
  colAmount: new BN(1000000000),
  debtAmount: new BN(0),
  connection,
  positionId: 0,
  signer: publicKey,
  vaultId: 1,
});

console.log("Created position NFT ID:", nftId);

// Use existing position for subsequent operations
const { ixs: subsequentIxs } = await getOperateIx({
  colAmount: new BN(500000000),
  debtAmount: new BN(200000000),
  connection,
  positionId: nftId, // Use the created position
  signer: publicKey,
  vaultId: 1,
});
```
