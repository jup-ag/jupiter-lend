# Jupiter Lend API Documentation

## Overview

The Jupiter Lend API provides REST endpoints for interacting with the Jupiter lending protocol. You can get either complete unsigned transactions or individual instructions for deposit and withdraw operations.

## Base URL

```
https://lend-api.jup.ag/v1/lending
```

## API Reference

Full API specification: [https://lend-api.jup.ag/docs#tag/lending](https://lend-api.jup.ag/docs#tag/lending)

---

## Endpoints

### Deposit Operations

#### `POST /deposit`

Returns a complete unsigned transaction for deposit operations.

#### `POST /deposit-instructions`

Returns individual transaction instructions for deposit operations.

### Withdraw Operations

#### `POST /withdraw`

Returns a complete unsigned transaction for withdraw operations.

#### `POST /withdraw-instructions`

Returns individual transaction instructions for withdraw operations.

---

## Request Parameters

All endpoints accept the following parameters:

```json
{
  "asset": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "signer": "4AwWnVxWKdZCZ8zVGdD7S3EwzRHkVRiXJxQKzwjbBayj",
  "amount": "10000"
}
```

| Parameter | Type   | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| `asset`   | string | Token mint address (e.g., USDC mint)                               |
| `signer`  | string | Wallet public key performing the operation                         |
| `amount`  | string | Amount in token's smallest unit (e.g., for USDC: 1000000 = 1 USDC) |

---

## Usage Examples

### Setup

```javascript
import {
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import axios from "axios";

// Connect to wallet
const { publicKey: signer } = await window.solana.connect();

// Setup connection
const connection = new Connection("SOLANA_RPC_URL");
```

---

## Deposit Operations

### Using Complete Transaction (`/deposit`)

```javascript
async function depositWithTransaction() {
  try {
    const payload = {
      asset: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
      amount: "1000000", // 1 USDC
      signer: signer.toString(),
    };

    // Get unsigned transaction
    const response = await axios.post(
      "https://lend-api.jup.ag/v1/lending/deposit",
      payload
    );

    // Deserialize transaction
    const transaction = Transaction.from(
      Buffer.from(response.data.transaction, "base64")
    );

    // Sign transaction
    const signedTx = await window.solana.signTransaction(transaction);

    // Send transaction
    const txid = await connection.sendRawTransaction(signedTx.serialize());

    console.log("Deposit transaction ID:", txid);

    // Wait for confirmation
    await connection.confirmTransaction(txid);
    console.log("Deposit confirmed!");
  } catch (error) {
    console.error("Deposit failed:", error.response?.data || error.message);
  }
}
```

### Using Instructions (`/deposit-instructions`)

```javascript
async function depositWithInstructions() {
  try {
    const payload = {
      asset: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
      amount: "1000000", // 1 USDC
      signer: signer.toString(),
    };

    // Get instructions
    const response = await axios.post(
      "https://lend-api.jup.ag/v1/lending/deposit-instructions",
      payload
    );

    // Build instruction
    const instruction = new TransactionInstruction({
      programId: new PublicKey(response.data.instructions[0].programId),
      keys: response.data.instructions[0].accounts.map((account) => ({
        ...account,
        pubkey: new PublicKey(account.pubkey),
      })),
      data: Buffer.from(response.data.instructions[0].data, "base64"),
    });

    console.log("Deposit instruction:", instruction);

    // Build transaction
    const transaction = new Transaction();
    transaction.add(instruction);

    // Set recent blockhash and fee payer
    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = signer;

    // Sign and send transaction
    const signedTx = await window.solana.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signedTx.serialize());

    console.log("Deposit transaction ID:", txid);
  } catch (error) {
    console.error("Deposit failed:", error.response?.data || error.message);
  }
}
```

---

## Withdraw Operations

### Using Complete Transaction (`/withdraw`)

```javascript
async function withdrawWithTransaction() {
  try {
    const payload = {
      asset: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
      amount: "500000", // 0.5 USDC
      signer: signer.toString(),
    };

    // Get unsigned transaction
    const response = await axios.post(
      "https://lend-api.jup.ag/v1/lending/withdraw",
      payload
    );

    // Deserialize transaction
    const transaction = Transaction.from(
      Buffer.from(response.data.transaction, "base64")
    );

    // Sign transaction
    const signedTx = await window.solana.signTransaction(transaction);

    // Send transaction
    const txid = await connection.sendRawTransaction(signedTx.serialize());

    console.log("Withdraw transaction ID:", txid);

    // Wait for confirmation
    await connection.confirmTransaction(txid);
    console.log("Withdraw confirmed!");
  } catch (error) {
    console.error("Withdraw failed:", error.response?.data || error.message);
  }
}
```

### Using Instructions (`/withdraw-instructions`)

```javascript
async function withdrawWithInstructions() {
  try {
    const payload = {
      asset: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
      amount: "500000", // 0.5 USDC
      signer: signer.toString(),
    };

    // Get instructions
    const response = await axios.post(
      "https://lend-api.jup.ag/v1/lending/withdraw-instructions",
      payload
    );

    // Build instruction
    const instruction = new TransactionInstruction({
      programId: new PublicKey(response.data.instructions[0].programId),
      keys: response.data.instructions[0].accounts.map((account) => ({
        ...account,
        pubkey: new PublicKey(account.pubkey),
      })),
      data: Buffer.from(response.data.instructions[0].data, "base64"),
    });

    console.log("Withdraw instruction:", instruction);

    // Build transaction
    const transaction = new Transaction();
    transaction.add(instruction);

    // Set recent blockhash and fee payer
    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = signer;

    // Sign and send transaction
    const signedTx = await window.solana.signTransaction(transaction);
    const txid = await connection.sendRawTransaction(signedTx.serialize());

    console.log("Withdraw transaction ID:", txid);
  } catch (error) {
    console.error("Withdraw failed:", error.response?.data || error.message);
  }
}
```

---

## Response Formats

### Transaction Endpoints (`/deposit`, `/withdraw`)

```json
{
  "transaction": "base64_encoded_unsigned_transaction"
}
```

### Instruction Endpoints (`/deposit-instructions`, `/withdraw-instructions`)

```json
{
  "instructions": [
    {
      "programId": "program_id_string",
      "accounts": [
        {
          "pubkey": "account_public_key",
          "isSigner": false,
          "isWritable": true
        }
      ],
      "data": "base64_encoded_instruction_data"
    }
  ]
}
```

### Best Practices

1. **Amount Formatting**: Always provide amounts as strings in the token's smallest unit

   ```javascript
   // Correct: 1 USDC = 1000000 (6 decimals)
   amount: "1000000";

   // Incorrect:
   amount: 1000000; // Number instead of string
   amount: "1.0"; // Decimal representation
   ```

---
