# Jupiter Lend Earn SDK Documentation

## Overview

The Jupiter Lend SDK provides a TypeScript interface for interacting with the Jupiter lending protocol. This documentation covers two main integration approaches: getting instruction objects for direct use and getting account contexts for Cross-Program Invocation (CPI) integrations.

This guide matches `@jup-ag/lend` 0.4.0.

## Installation

```bash
npm install @jup-ag/lend
```

## Setup

```typescript
import {
  Connection,
  Keypair,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  getDepositIxs, getWithdrawIxs, // get instructions
  getDepositContext, getWithdrawContext, // get context accounts for CPI
} from "@jup-ag/lend/earn";
import { BN } from "bn.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const signer = Keypair.fromSecretKey(new Uint8Array(privateKey));

// Example asset mints
const usdc = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"); // USDC mainnet
```

### Markets

Every function takes a `market` parameter: `"main"`, `"ethena"`. Each market is a separate deployment with its own program IDs. The instruction builders default to `"main"`; the context and read functions require it.

---

## Instruction

`getDepositIxs` and `getWithdrawIxs` return `{ ixs: TransactionInstruction[] }`. Add all of `ixs`, in order, to your transaction.

Amounts are `BN` values in the asset's native decimals. Pass `u64::MAX` (`new BN("18446744073709551615")`) to deposit the full token balance or withdraw the full fToken balance.

| Option            | Default | Effect                                                                                                                              |
| ----------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `market`          | `"main"` | Market to use                                                                                                                      |
| `includeATASetup` | `false` | Prepends create-ATA instructions for the fToken (deposit) or the asset (withdraw). The program does not create token accounts itself |
| `includeWrapSol`  | `false` | When `asset` is wrapped SOL, wraps native SOL before a deposit and unwraps after a withdraw                                          |
| `wrapAmount`      | -       | Deposit only. Lamports to wrap when `amount` is the `u64::MAX` sentinel and `includeWrapSol` is set                                  |

### Get Deposit Instructions

```typescript
const { ixs: depositIxs } = await getDepositIxs({
    amount: new BN(1000000), // amount in token decimals (1 USDC)
    asset: usdc, // asset mint address
    signer: signer.publicKey, // signer public key
    connection, // Solana connection
    market: "main",
});
```

### Get Withdraw Instructions

```typescript
const { ixs: withdrawIxs } = await getWithdrawIxs({
    amount: new BN(1000000), // amount in token decimals (1 USDC)
    asset: usdc, // asset mint address
    signer: signer.publicKey, // signer public key
    connection, // Solana connection
    market: "main",
});
```

### Example Instruction Usage

```typescript
import {
    Connection,
    Keypair,
    PublicKey,
    TransactionMessage,
    VersionedTransaction,
} from "@solana/web3.js";
import { getDepositIxs } from "@jup-ag/lend/earn";
import { BN } from "bn.js";

const signer = Keypair.fromSecretKey(new Uint8Array(privateKey));
const connection = new Connection("https://api.mainnet-beta.solana.com");

// Get deposit instructions
const { ixs } = await getDepositIxs({
    amount: new BN(1000000), // amount in token decimals (1 USDC)
    asset: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), // asset mint address
    signer: signer.publicKey, // signer public key
    connection, // Solana connection
    includeATASetup: true, // create the fToken account if it does not exist
});

const latestBlockhash = await connection.getLatestBlockhash();
const messageV0 = new TransactionMessage({
    payerKey: signer.publicKey,
    recentBlockhash: latestBlockhash.blockhash,
    instructions: ixs,
}).compileToV0Message();

const transaction = new VersionedTransaction(messageV0);
transaction.sign([signer]);

const signature = await connection.sendRawTransaction(transaction.serialize());
console.log(`https://solscan.io/tx/${signature}`);
```

## CPI

For Anchor programs that need to make CPI calls to Jupiter Lend, use the context methods.

### Deposit Context Accounts

```typescript
const depositContext = await getDepositContext({
    asset: usdc, // asset mint address
    signer: signer.publicKey, // signer public key
    connection,
    market: "main",
});
```

<details>
    <summary>
        <div>
            <div>
                <b>Deposit Context Accounts Table</b>
            </div>
        </div>
    </summary>

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
| `tokenProgram`                     | Token program that owns the asset mint   |
| `systemProgram`                    | System program                           |

The context also contains `claimAccount`, `borrowTokenReservesLiquidity`, `lendingBorrowPositionOnLiquidity` and `sysvarInstruction`. The `deposit` instruction does not use them. `associatedTokenProgram` is not included; pass the Associated Token program ID.
</details>

### Withdraw Context Accounts

```typescript
const withdrawContext = await getWithdrawContext({
    asset: usdc, // asset mint address
    signer: signer.publicKey, // signer public key
    connection,
    market: "main",
});
```

<details>
    <summary>
        <div>
            <div>
                <b>Withdraw Context Accounts Table</b>
            </div>
        </div>
    </summary>
Similar to deposit context, but includes:

- `ownerTokenAccount`: User's fToken account (source of fTokens to burn)
- `claimAccount`: Claim account on the liquidity program. Optional in the IDL and not used by `withdraw`

| Account                            | Purpose                                     |
| ---------------------------------- | ------------------------------------------- |
| `signer`                           | User's wallet public key                    |
| `ownerTokenAccount`                | User's fToken account (source)              |
| `recipientTokenAccount`            | User's underlying token account (destination) |
| `claimAccount`                     | Liquidity claim account (optional)          |
| `mint`                             | Underlying token mint                       |
| `lendingAdmin`                     | Protocol configuration PDA                  |
| `lending`                          | Pool-specific configuration PDA             |
| `fTokenMint`                       | fToken mint account                         |
| `supplyTokenReservesLiquidity`     | Liquidity protocol token reserves           |
| `lendingSupplyPositionOnLiquidity` | Protocol's position in liquidity pool       |
| `rateModel`                        | Interest rate calculation model             |
| `vault`                            | Protocol vault holding deposited tokens     |
| `liquidity`                        | Main liquidity protocol PDA                 |
| `liquidityProgram`                 | Liquidity protocol program ID               |
| `rewardsRateModel`                 | Rewards calculation model PDA               |
| `tokenProgram`                     | Token program that owns the asset mint      |
| `systemProgram`                    | System program                              |
</details>

### Example CPI Usage

```typescript
const depositContext = await getDepositContext({
  asset: usdcMint,
  signer: userPublicKey,
  connection,
  market: "main",
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
      "jup3YeL8QhtSx1e253b2FDvsMNC87fDrgQZivbrndc9"
    ), // main market
  })
  .rpc();
```

---

## Read Functions

The Jupiter Lend SDK provides several read functions to query protocol data and user positions, this can be helpful to display on your frontend.

### Get All Lending Tokens

Retrieves all available lending tokens in the Jupiter Lend Earn protocol.

The `getLendingTokens` function returns an array of `PublicKey` objects.

```typescript
import { getLendingTokens } from "@jup-ag/lend/earn";

const allTokens = await getLendingTokens({ connection, market: "main" });
```
```typescript
[
    PublicKey,
    PublicKey,
    ...
]
```

### Get Token Details

Fetches detailed information about a specific lending token.

```typescript
import { getLendingTokenDetails } from "@jup-ag/lend/earn";

const tokenDetails = await getLendingTokenDetails({
    lendingToken: new PublicKey("9BEcn9aPEmhSPbPQeFGjidRiEKki46fVQDyPpSQXPA2D"), // allTokens[x] from the previous example
    connection,
    market: "main",
});
```
```typescript
{
  id: number; // ID of jlToken, starts from 1
  address: PublicKey; // Address of jlToken
  asset: PublicKey; // Address of underlying asset
  decimals: number; // Decimals of asset (same as jlToken decimals)
  totalAssets: BN; // Total underlying assets in the pool
  totalSupply: BN; // Total shares supply
  convertToShares: BN; // Shares for one whole asset token (10^decimals units), rounded to nearest
  convertToAssets: BN; // Assets for one whole share (10^decimals units), rounded to nearest
  rewardsRate: BN; // Rewards rate (1e4 decimals, 1e4 = 100%), rounded down
  supplyRate: BN; // Supply APY rate (1e4 decimals, 1e4 = 100%), rounded down
}
```

### Get User Position

Retrieves a user's lending position for a specific asset:

```typescript
import { getUserLendingPositionByAsset } from "@jup-ag/lend/earn";

const userPosition = await getUserLendingPositionByAsset({
    asset: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"), // The address of underlying asset or tokenDetails.asset
    user: signer.publicKey, // User's wallet address
    connection,
    market: "main",
});
```
```typescript
{
  lendingTokenShares: BN; // User's shares in jlToken
  underlyingAssets: BN; // User's underlying assets
  underlyingBalance: BN; // User's underlying balance
}
```
