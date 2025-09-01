# Jupiter Lend Earn SDK Documentation

## Overview

The Jupiter Lend SDK provides a TypeScript interface for interacting with the Jupiter lending protocol. This documentation covers two main integration approaches: getting instruction objects for direct use and getting account contexts for Cross-Program Invocation (CPI) integrations.

## Installation

```bash
npm install @jup-ag/lend
```

## Setup

```typescript
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import {
  getDepositIx,
  getDepositContext,
  getWithdrawIx,
  getWithdrawContext,
} from "@jup-ag/lend/earn";
import { BN } from "bn.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const signer = new PublicKey("YOUR_SIGNER_PUBLIC_KEY");

// Example asset mints
const usdc = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // USDC mainnet
```

---

## Deposit Operations

### Getting Deposit Instruction

Use `getDepositIx()` to get a transaction instruction that can be included in your transactions:

```typescript
// Get deposit instruction
const depositIx = await getDepositIx({
  amount: new BN(1000000), // amount in token decimals (1 USDC)
  asset: usdc, // asset mint address
  signer, // signer public key
  connection, // Solana connection
  cluster: "mainnet",
});

// Use the instruction in your transaction
const transaction = new Transaction().add(depositIx);
const latestBlockhash = await connection.getLatestBlockhash();
transaction.recentBlockhash = latestBlockhash.blockhash;
transaction.feePayer = signer;

// Sign and send transaction
const signature = await connection.sendTransaction(transaction, [
  signerKeypair,
]);
console.log("Transaction ID:", signature);
```

### Getting Deposit Context for CPI Integration

Use `getDepositContext()` to get all the accounts needed for Cross-Program Invocation (CPI) calls:

```typescript
// Get account context for CPI integration
const depositContext = await getDepositContext({
  asset: usdc, // asset mint address
  signer, // signer public key
});

console.log("Deposit context accounts:", depositContext);
/*
Returns all account addresses needed for CPI:
{
  signer: PublicKey,
  depositorTokenAccount: PublicKey,
  recipientTokenAccount: PublicKey,
  mint: PublicKey,
  lendingAdmin: PublicKey,
  lending: PublicKey,
  fTokenMint: PublicKey,
  supplyTokenReservesLiquidity: PublicKey,
  lendingSupplyPositionOnLiquidity: PublicKey,
  rateModel: PublicKey,
  vault: PublicKey,
  liquidity: PublicKey,
  liquidityProgram: PublicKey,
  rewardsRateModel: PublicKey,
  tokenProgram: PublicKey,
  associatedTokenProgram: PublicKey,
  systemProgram: PublicKey
}
*/
```

---

> Deposit script - https://play.instadapp.io/lIkBqEx3ONmuMOypT16Y2

## Withdraw Operations

### Getting Withdraw Instruction

Use `getWithdrawIx()` to get a transaction instruction:

```typescript
// Get withdraw instruction
const withdrawIx = await getWithdrawIx({
  amount: new BN(500000), // amount in token decimals (0.5 USDC)
  asset: usdc, // asset mint address
  signer, // signer public key
  connection, // Solana connection
  cluster: "mainnet", // cluster to connect to
});

// Use the instruction in your transaction
const transaction = new Transaction().add(withdrawIx);
const latestBlockhash = await connection.getLatestBlockhash();
transaction.recentBlockhash = latestBlockhash.blockhash;
transaction.feePayer = signer;

// Sign and send transaction
const signature = await connection.sendTransaction(transaction, [
  signerKeypair,
]);
console.log("Transaction ID:", signature);
```

### Getting Withdraw Context for CPI Integration

Use `getWithdrawContext()` to get all the accounts needed for CPI calls:

```typescript
// Get account context for CPI integration
const withdrawContext = await getWithdrawContext({
  asset: usdc, // asset mint address
  signer, // signer public key
});

console.log("Withdraw context accounts:", withdrawContext);
/*
Returns all account addresses needed for CPI:
{
  signer: PublicKey,
  ownerTokenAccount: PublicKey,
  recipientTokenAccount: PublicKey,
  lendingAdmin: PublicKey,
  lending: PublicKey,
  mint: PublicKey,
  fTokenMint: PublicKey,
  supplyTokenReservesLiquidity: PublicKey,
  lendingSupplyPositionOnLiquidity: PublicKey,
  rateModel: PublicKey,
  vault: PublicKey,
  claimAccount: PublicKey,
  liquidity: PublicKey,
  liquidityProgram: PublicKey,
  rewardsRateModel: PublicKey,
  tokenProgram: PublicKey,
  associatedTokenProgram: PublicKey,
  systemProgram: PublicKey
}
*/
```

---

> withdraw script - https://play.instadapp.io/EWbjqXW7aMDB9BeWjTn71

## Complete Usage Example

```typescript
import { Connection, PublicKey, Transaction, Keypair } from "@solana/web3.js";
import {
  getDepositIx,
  getDepositContext,
  getWithdrawIx,
  getWithdrawContext,
} from "@jup-ag/lend/earn";
import { BN } from "bn.js";

async function main() {
  // Setup
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  const signerKeypair = Keypair.generate(); // In practice, load your keypair
  const signer = signerKeypair.publicKey;
  const usdc = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");

  try {
    // === DEPOSIT EXAMPLE ===

    // Option 1: Get account context for CPI integration
    console.log("Loading deposit accounts...");
    const depositContext = await getDepositContext({
      asset: usdc,
      signer,
    });
    console.log("Deposit context:", depositContext);

    // Option 2: Get instruction for transaction
    console.log("Creating deposit instruction...");
    const depositIx = await getDepositIx({
      amount: new BN(1000000), // 1 USDC
      asset: usdc,
      signer,
      connection,
      cluster: "mainnet",
    });

    // Build and send deposit transaction
    let depositTx = new Transaction();
    depositTx.add(depositIx);
    const latestBlockhash = await connection.getLatestBlockhash();
    depositTx.recentBlockhash = latestBlockhash.blockhash;
    depositTx.feePayer = signer;

    const depositTxid = await connection.sendTransaction(depositTx, [
      signerKeypair,
    ]);
    console.log("Deposit transaction ID:", depositTxid);

    // Wait for confirmation
    await connection.confirmTransaction(depositTxid);

    // === WITHDRAW EXAMPLE ===

    // Option 1: Get account context for CPI integration
    console.log("Loading withdraw accounts...");
    const withdrawContext = await getWithdrawContext({
      asset: usdc,
      signer,
    });
    console.log("Withdraw context:", withdrawContext);

    // Option 2: Get instruction for transaction
    console.log("Creating withdraw instruction...");
    const withdrawIx = await getWithdrawIx({
      amount: new BN(500000), // 0.5 USDC
      asset: usdc,
      signer,
      connection,
    });

    // Build and send withdraw transaction
    let withdrawTx = new Transaction();
    withdrawTx.add(withdrawIx);
    const latestBlockhash2 = await connection.getLatestBlockhash();
    withdrawTx.recentBlockhash = latestBlockhash2.blockhash;
    withdrawTx.feePayer = signer;

    const withdrawTxid = await connection.sendTransaction(withdrawTx, [
      signerKeypair,
    ]);
    console.log("Withdraw transaction ID:", withdrawTxid);
  } catch (error) {
    console.error("Operation failed:", error);
  }
}

main();
```

---

## CPI Integration Usage

For Anchor programs that need to make CPI calls to Jupiter Lend, use the context methods:

```typescript
// In your frontend/client code
const depositContext = await getDepositContext({
  asset: usdcMint,
  signer: userPublicKey,
});

// Pass these accounts to your Anchor program
await program.methods
  .yourDepositMethod(amount)
  .accounts({
    // Your program accounts
    userAccount: userAccount,

    // Jupiter Lend accounts (from context)
    signer: depositContext.signer,
    depositorTokenAccount: depositContext.depositorTokenAccount,
    recipientTokenAccount: depositContext.recipientTokenAccount,
    lendingAdmin: depositContext.lendingAdmin,
    lending: depositContext.lending,
    fTokenMint: depositContext.fTokenMint,
    // ... all other accounts from context

    lendingProgram: new PublicKey(
      "7tjE28izRUjzmxC1QNXnNwcc4N82CNYCexf3k8mw67s3"
    ),
  })
  .rpc();
```

---

### Deposit Context Accounts

| Account                            | Purpose                                  |
| ---------------------------------- | ---------------------------------------- |
| `signer`                           | User's wallet public key                 |
| `depositorTokenAccount`            | User's underlying token account (source) |
| `recipientTokenAccount`            | User's fToken account (destination)      |
| `mint`                             | Underlying token mint                    |
| `lendingAdmin`                     | Protocol configuration PDA               |
| `lending`                          | Pool-specific configuration PDA          |
| `fTokenMint`                       | fToken mint account                      |
| `supplyTokenReservesLiquidity`     | Liquidity protocol token reserves        |
| `lendingSupplyPositionOnLiquidity` | Protocol's position in liquidity pool    |
| `rateModel`                        | Interest rate calculation model          |
| `vault`                            | Protocol vault holding deposited tokens  |
| `liquidity`                        | Main liquidity protocol PDA              |
| `liquidityProgram`                 | Liquidity protocol program ID            |
| `rewardsRateModel`                 | Rewards calculation model PDA            |

### Withdraw Context Accounts

Similar to deposit context, but includes:

- `ownerTokenAccount`: User's fToken account (source of fTokens to burn)
- `claimAccount`: Additional account for withdrawal claim processing

---

## Read functions

### 1. Get All Lending Tokens

Retrieves all available lending tokens in the Jupiter Lend Earn protocol.

```ts
// Get all lending token addresses (jlToken addresses)
const allTokens = await getLendingTokens({ connection });

console.log("Available lending tokens:", allTokens);
console.log("Number of tokens:", allTokens.length);

// allTokens is an array of PublicKey objects
// Example: [PublicKey, PublicKey, PublicKey, ...]
```

### 2. Get Token Details

Fetches detailed information about a specific lending token:

```ts
// Get details for the first token
const tokenDetails = await getLendingTokenDetails({
  lendingToken: allTokens[0],
  connection,
});

console.log("Token details:", tokenDetails);
```

Returns:

```ts
{
  id: number; // ID of jlToken, starts from 1
  address: PublicKey; // Address of jlToken
  asset: PublicKey; // Address of underlying asset
  decimals: number; // Decimals of asset (same as jlToken decimals)
  totalAssets: BN; // Total underlying assets in the pool
  totalSupply: BN; // Total shares supply
  convertToShares: BN; // Multiplier to convert assets to shares
  convertToAssets: BN; // Multiplier to convert shares to assets
  rewardsRate: BN; // Rewards rate (1e4 decimals, 1e4 = 100%)
  supplyRate: BN; // Supply APY rate (1e4 decimals, 1e4 = 100%)
}
```

### 3. Get User Position

Retrieves a user's lending position for a specific asset:

```ts
// Get user position for a specific token
const userPosition = await getUserLendingPositionByAsset({
  asset: tokenDetails.asset, // The address of underlying asset
  user: userWallet, // User's wallet address
  connection,
});

console.log("User position:", userPosition);
```

Returns:

```ts
{
  lendingTokenShares: BN; // User's shares in jlToken
  underlyingAssets: BN; // User's underlying assets
  underlyingBalance: BN; // User's underlying balance
}
```

#### Complete Usage Example

```ts
import { Connection, PublicKey } from "@solana/web3.js";
import {
  getLendingTokens,
  getLendingTokenDetails,
  getUserLendingPositionByAsset,
} from "@jup-ag/lend/earn";
import { BN } from "bn.js";

async function fetchLendingData() {
  const connection = new Connection("RPC");
  const userWallet = new PublicKey("USER_PUBKEY");

  try {
    console.log(" Fetching all lending tokens...");
    const allTokens = await getLendingTokens({ connection });
    console.log(`Found ${allTokens.length} lending tokens`);

    console.log("\n Fetching token details...");
    for (let i = 0; i < allTokens.length; i++) {
      const token = allTokens[i];

      try {
        const details = await getLendingTokenDetails({
          lendingToken: token,
          connection,
        });

        console.log(`\nToken ${i + 1}:`);
        console.log(`  Address: ${details.address.toString()}`);
        console.log(`  Asset: ${details.asset.toString()}`);
        console.log(`  Decimals: ${details.decimals}`);
        console.log(`  Total Assets: ${details.totalAssets.toString()}`);
        console.log(`  Total Supply: ${details.totalSupply.toString()}`);
        console.log(`  Supply Rate: ${details.supplyRate.toNumber() / 100}%`);
        console.log(`  Rewards Rate: ${details.rewardsRate.toNumber() / 100}%`);

        const userPosition = await getUserLendingPositionByAsset({
          asset: details.asset,
          user: userWallet,
          connection,
        });

        // prettier-ignore
        if (userPosition.lendingTokenShares.gt(new BN(0))) {
          console.log(`  User Position:`);
          console.log(`    Shares: ${userPosition.lendingTokenShares.toString()}`);
          console.log(`    Assets: ${userPosition.underlyingAssets.toString()}`);
          console.log(`    Balance: ${userPosition.underlyingBalance.toString()}`);
        } else {
          console.log(` No position for this user`);
        }
      } catch (error) {
        console.log(
          ` Error fetching details for token ${i + 1}:`,
          error.message
        );
      }
    }
  } catch (error) {
    console.error("Error fetching lending data:", error);
  }
}

fetchLendingData();
```
