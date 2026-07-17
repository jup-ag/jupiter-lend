/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/dex.json`.
 */
export type Dex = {
  address: "jupZ4m2GqUCJ5iueMfzQf8khFfH31d4XAQt3RzCT9Vd";
  metadata: {
    name: "dex";
    version: "0.1.5";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "borrow";
      discriminator: [228, 253, 131, 202, 207, 116, 89, 18];
      accounts: [
        {
          name: "signer";
          docs: [
            "The protocol calling the operation (must match position.protocol)",
          ];
          writable: true;
          signer: true;
        },
        {
          name: "dex";
          docs: ["DEX pool state"];
          writable: true;
        },
        {
          name: "user";
          signer: true;
        },
        {
          name: "position";
          docs: ["The user's DexPosition (tracks shares and limits)"];
          writable: true;
        },
        {
          name: "userToken0Account";
          writable: true;
        },
        {
          name: "userToken1Account";
          writable: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          docs: ["Liquidity vault token account for tokens"];
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          docs: ["DEX's supply position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          docs: ["DEX's borrow position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "oracleProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientToken0Account";
          writable: true;
          optional: true;
        },
        {
          name: "recipientToken1Account";
          writable: true;
          optional: true;
        },
      ];
      args: [
        {
          name: "token0Amt";
          type: "u64";
        },
        {
          name: "token1Amt";
          type: "u64";
        },
        {
          name: "maxShares";
          type: "u64";
        },
      ];
      returns: "u128";
    },
    {
      name: "borrowPerfect";
      discriminator: [210, 67, 245, 255, 134, 200, 153, 58];
      accounts: [
        {
          name: "signer";
          docs: [
            "The protocol calling the operation (must match position.protocol)",
          ];
          writable: true;
          signer: true;
        },
        {
          name: "dex";
          docs: ["DEX pool state"];
          writable: true;
        },
        {
          name: "user";
          signer: true;
        },
        {
          name: "position";
          docs: ["The user's DexPosition (tracks shares and limits)"];
          writable: true;
        },
        {
          name: "userToken0Account";
          writable: true;
        },
        {
          name: "userToken1Account";
          writable: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          docs: ["Liquidity vault token account for tokens"];
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          docs: ["DEX's supply position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          docs: ["DEX's borrow position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "oracleProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientToken0Account";
          writable: true;
          optional: true;
        },
        {
          name: "recipientToken1Account";
          writable: true;
          optional: true;
        },
      ];
      args: [
        {
          name: "shares";
          type: "u64";
        },
        {
          name: "minToken0";
          type: "u64";
        },
        {
          name: "minToken1";
          type: "u64";
        },
      ];
    },
    {
      name: "deposit";
      discriminator: [242, 35, 198, 137, 82, 225, 242, 182];
      accounts: [
        {
          name: "signer";
          docs: [
            "The protocol calling the operation (must match position.protocol)",
          ];
          writable: true;
          signer: true;
        },
        {
          name: "dex";
          docs: ["DEX pool state"];
          writable: true;
        },
        {
          name: "user";
          signer: true;
        },
        {
          name: "position";
          docs: ["The user's DexPosition (tracks shares and limits)"];
          writable: true;
        },
        {
          name: "userToken0Account";
          writable: true;
        },
        {
          name: "userToken1Account";
          writable: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          docs: ["Liquidity vault token account for tokens"];
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          docs: ["DEX's supply position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          docs: ["DEX's borrow position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "oracleProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientToken0Account";
          writable: true;
          optional: true;
        },
        {
          name: "recipientToken1Account";
          writable: true;
          optional: true;
        },
      ];
      args: [
        {
          name: "token0Amt";
          type: "u64";
        },
        {
          name: "token1Amt";
          type: "u64";
        },
        {
          name: "minShares";
          type: "u64";
        },
      ];
      returns: "u128";
    },
    {
      name: "depositPerfect";
      discriminator: [4, 98, 66, 216, 110, 126, 154, 8];
      accounts: [
        {
          name: "signer";
          docs: [
            "The protocol calling the operation (must match position.protocol)",
          ];
          writable: true;
          signer: true;
        },
        {
          name: "dex";
          docs: ["DEX pool state"];
          writable: true;
        },
        {
          name: "user";
          signer: true;
        },
        {
          name: "position";
          docs: ["The user's DexPosition (tracks shares and limits)"];
          writable: true;
        },
        {
          name: "userToken0Account";
          writable: true;
        },
        {
          name: "userToken1Account";
          writable: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          docs: ["Liquidity vault token account for tokens"];
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          docs: ["DEX's supply position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          docs: ["DEX's borrow position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "oracleProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientToken0Account";
          writable: true;
          optional: true;
        },
        {
          name: "recipientToken1Account";
          writable: true;
          optional: true;
        },
      ];
      args: [
        {
          name: "shares";
          type: "u64";
        },
        {
          name: "maxToken0";
          type: "u64";
        },
        {
          name: "maxToken1";
          type: "u64";
        },
      ];
    },
    {
      name: "initDex";
      discriminator: [222, 187, 81, 48, 89, 117, 230, 164];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "dexAdmin";
          writable: true;
        },
        {
          name: "dex";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [100, 101, 120];
              },
              {
                kind: "account";
                path: "dex_admin.next_dex_id";
                account: "dexAdmin";
              },
            ];
          };
        },
        {
          name: "dexMetadata";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [100, 101, 120, 95, 109, 101, 116, 97, 100, 97, 116, 97];
              },
              {
                kind: "account";
                path: "dex_admin.next_dex_id";
                account: "dexAdmin";
              },
            ];
          };
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "initDexParams";
            };
          };
        },
      ];
    },
    {
      name: "initDexAdmin";
      discriminator: [16, 61, 98, 61, 189, 243, 52, 252];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "dexAdmin";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [100, 101, 120, 95, 97, 100, 109, 105, 110];
              },
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "liquidity";
          type: "pubkey";
        },
        {
          name: "authority";
          type: "pubkey";
        },
      ];
    },
    {
      name: "initDexMetadata";
      discriminator: [114, 167, 144, 220, 143, 73, 224, 8];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [100, 101, 120];
              },
              {
                kind: "arg";
                path: "dexId";
              },
            ];
          };
        },
        {
          name: "dexMetadata";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [100, 101, 120, 95, 109, 101, 116, 97, 100, 97, 116, 97];
              },
              {
                kind: "arg";
                path: "dexId";
              },
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "dexId";
          type: "u16";
        },
        {
          name: "lookupTable";
          type: "pubkey";
        },
      ];
    },
    {
      name: "initPosition";
      discriminator: [197, 20, 10, 1, 97, 160, 177, 91];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
        },
        {
          name: "position";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  100,
                  101,
                  120,
                  95,
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110,
                ];
              },
              {
                kind: "account";
                path: "dex";
              },
              {
                kind: "arg";
                path: "protocol";
              },
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "protocol";
          type: "pubkey";
        },
      ];
    },
    {
      name: "pauseDex";
      discriminator: [138, 255, 101, 0, 116, 202, 128, 100];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
      ];
      args: [];
    },
    {
      name: "pauseSwapAndArbitrage";
      discriminator: [252, 67, 166, 62, 45, 136, 88, 76];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
      ];
      args: [];
    },
    {
      name: "pauseUser";
      discriminator: [18, 63, 43, 94, 239, 53, 101, 14];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
        },
        {
          name: "position";
          writable: true;
        },
      ];
      args: [
        {
          name: "pauseSupply";
          type: "bool";
        },
        {
          name: "pauseBorrow";
          type: "bool";
        },
      ];
    },
    {
      name: "payback";
      discriminator: [148, 144, 50, 144, 8, 112, 203, 3];
      accounts: [
        {
          name: "signer";
          docs: [
            "The protocol calling the operation (must match position.protocol)",
          ];
          writable: true;
          signer: true;
        },
        {
          name: "dex";
          docs: ["DEX pool state"];
          writable: true;
        },
        {
          name: "user";
          signer: true;
        },
        {
          name: "position";
          docs: ["The user's DexPosition (tracks shares and limits)"];
          writable: true;
        },
        {
          name: "userToken0Account";
          writable: true;
        },
        {
          name: "userToken1Account";
          writable: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          docs: ["Liquidity vault token account for tokens"];
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          docs: ["DEX's supply position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          docs: ["DEX's borrow position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "oracleProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientToken0Account";
          writable: true;
          optional: true;
        },
        {
          name: "recipientToken1Account";
          writable: true;
          optional: true;
        },
      ];
      args: [
        {
          name: "token0Amt";
          type: "u64";
        },
        {
          name: "token1Amt";
          type: "u64";
        },
        {
          name: "minShares";
          type: "u64";
        },
      ];
      returns: "u128";
    },
    {
      name: "paybackPerfect";
      discriminator: [39, 2, 197, 102, 11, 186, 97, 1];
      accounts: [
        {
          name: "signer";
          docs: [
            "The protocol calling the operation (must match position.protocol)",
          ];
          writable: true;
          signer: true;
        },
        {
          name: "dex";
          docs: ["DEX pool state"];
          writable: true;
        },
        {
          name: "user";
          signer: true;
        },
        {
          name: "position";
          docs: ["The user's DexPosition (tracks shares and limits)"];
          writable: true;
        },
        {
          name: "userToken0Account";
          writable: true;
        },
        {
          name: "userToken1Account";
          writable: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          docs: ["Liquidity vault token account for tokens"];
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          docs: ["DEX's supply position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          docs: ["DEX's borrow position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "oracleProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientToken0Account";
          writable: true;
          optional: true;
        },
        {
          name: "recipientToken1Account";
          writable: true;
          optional: true;
        },
      ];
      args: [
        {
          name: "shares";
          type: "u64";
        },
        {
          name: "maxToken0";
          type: "u64";
        },
        {
          name: "maxToken1";
          type: "u64";
        },
      ];
    },
    {
      name: "paybackPerfectInOneToken";
      discriminator: [134, 210, 96, 6, 127, 183, 182, 146];
      accounts: [
        {
          name: "signer";
          docs: [
            "The protocol calling the operation (must match position.protocol)",
          ];
          writable: true;
          signer: true;
        },
        {
          name: "dex";
          docs: ["DEX pool state"];
          writable: true;
        },
        {
          name: "user";
          signer: true;
        },
        {
          name: "position";
          docs: ["The user's DexPosition (tracks shares and limits)"];
          writable: true;
        },
        {
          name: "userToken0Account";
          writable: true;
        },
        {
          name: "userToken1Account";
          writable: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          docs: ["Liquidity vault token account for tokens"];
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          docs: ["DEX's supply position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          docs: ["DEX's borrow position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "oracleProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientToken0Account";
          writable: true;
          optional: true;
        },
        {
          name: "recipientToken1Account";
          writable: true;
          optional: true;
        },
      ];
      args: [
        {
          name: "shares";
          type: "u64";
        },
        {
          name: "maxToken0";
          type: "u64";
        },
        {
          name: "maxToken1";
          type: "u64";
        },
      ];
      returns: "u64";
    },
    {
      name: "previewDexShares";
      docs: [
        "Read-only: returns the exact collateral/debt share deltas a real operate",
        "would produce for the given (signed) token amounts, via `return_data`.",
        "Mutates nothing; meant to be run through `simulateTransaction` so an SDK",
        "can attach the correct vault tick / branch accounts. See `preview.rs`.",
      ];
      discriminator: [246, 97, 50, 171, 63, 142, 62, 229];
      accounts: [
        {
          name: "dex";
        },
        {
          name: "position";
          docs: [
            "The protocol's DEX position (holds the share balances / withdrawal limits",
            "that gate the operation). Only read here; mutated on a local copy.",
          ];
        },
        {
          name: "token0Reserve";
        },
        {
          name: "token1Reserve";
        },
        {
          name: "dexSupplyPositionToken0";
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          optional: true;
        },
        {
          name: "oracleProgram";
        },
      ];
      args: [
        {
          name: "colToken0";
          type: "i64";
        },
        {
          name: "colToken1";
          type: "i64";
        },
        {
          name: "debtToken0";
          type: "i64";
        },
        {
          name: "debtToken1";
          type: "i64";
        },
      ];
    },
    {
      name: "swapIn";
      discriminator: [141, 172, 10, 208, 69, 9, 56, 154];
      accounts: [
        {
          name: "signer";
          docs: [
            "The caller initiating the operation",
            "Funds will be transferred from signer to LL",
          ];
          writable: true;
          signer: true;
        },
        {
          name: "dex";
          writable: true;
        },
        {
          name: "userToken0Account";
          writable: true;
        },
        {
          name: "userToken1Account";
          writable: true;
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientToken0Account";
          writable: true;
          optional: true;
        },
        {
          name: "recipientToken1Account";
          writable: true;
          optional: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          docs: ["Liquidity vault token account for tokens"];
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          docs: ["DEX's supply position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          docs: ["DEX's borrow position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
        {
          name: "oracleProgram";
        },
      ];
      args: [
        {
          name: "swap0to1";
          type: "bool";
        },
        {
          name: "amountIn";
          type: "u64";
        },
        {
          name: "amountOutMin";
          type: "u64";
        },
      ];
      returns: "u64";
    },
    {
      name: "swapOut";
      discriminator: [206, 36, 149, 14, 163, 132, 148, 1];
      accounts: [
        {
          name: "signer";
          docs: [
            "The caller initiating the operation",
            "Funds will be transferred from signer to LL",
          ];
          writable: true;
          signer: true;
        },
        {
          name: "dex";
          writable: true;
        },
        {
          name: "userToken0Account";
          writable: true;
        },
        {
          name: "userToken1Account";
          writable: true;
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientToken0Account";
          writable: true;
          optional: true;
        },
        {
          name: "recipientToken1Account";
          writable: true;
          optional: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          docs: ["Liquidity vault token account for tokens"];
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          docs: ["DEX's supply position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          docs: ["DEX's borrow position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
        {
          name: "oracleProgram";
        },
      ];
      args: [
        {
          name: "swap0to1";
          type: "bool";
        },
        {
          name: "amountOut";
          type: "u64";
        },
        {
          name: "amountInMax";
          type: "u64";
        },
      ];
      returns: "u64";
    },
    {
      name: "turnOnSmartCol";
      discriminator: [143, 236, 131, 173, 22, 90, 214, 202];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
        {
          name: "adminToken0Account";
          writable: true;
        },
        {
          name: "adminToken1Account";
          writable: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
      ];
      args: [
        {
          name: "token0Amt";
          type: "u64";
        },
      ];
    },
    {
      name: "turnOnSmartDebt";
      discriminator: [177, 184, 215, 221, 92, 231, 153, 83];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
        {
          name: "adminToken0Account";
          writable: true;
        },
        {
          name: "adminToken1Account";
          writable: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
      ];
      args: [
        {
          name: "token0Amt";
          type: "u64";
        },
      ];
    },
    {
      name: "unpauseDex";
      discriminator: [88, 52, 175, 105, 210, 116, 178, 218];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
      ];
      args: [];
    },
    {
      name: "unpauseSwapAndArbitrage";
      discriminator: [241, 4, 197, 110, 244, 255, 172, 184];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
      ];
      args: [];
    },
    {
      name: "unpauseUser";
      discriminator: [71, 115, 128, 252, 182, 126, 234, 62];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
        },
        {
          name: "position";
          writable: true;
        },
      ];
      args: [
        {
          name: "unpauseSupply";
          type: "bool";
        },
        {
          name: "unpauseBorrow";
          type: "bool";
        },
      ];
    },
    {
      name: "updateAuthority";
      discriminator: [32, 46, 64, 28, 149, 75, 243, 88];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
          writable: true;
        },
      ];
      args: [
        {
          name: "newAuthority";
          type: "pubkey";
        },
      ];
    },
    {
      name: "updateAuths";
      discriminator: [93, 96, 178, 156, 57, 117, 253, 209];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
          writable: true;
        },
      ];
      args: [
        {
          name: "authStatus";
          type: {
            vec: {
              defined: {
                name: "addressBool";
              };
            };
          };
        },
      ];
    },
    {
      name: "updateCenterPriceAddress";
      discriminator: [45, 110, 96, 39, 201, 250, 142, 1];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
      ];
      args: [
        {
          name: "centerPriceAddress";
          type: "pubkey";
        },
        {
          name: "percent";
          type: "u32";
        },
        {
          name: "time";
          type: "u32";
        },
      ];
    },
    {
      name: "updateCenterPriceLimits";
      discriminator: [17, 23, 56, 200, 237, 163, 24, 152];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
      ];
      args: [
        {
          name: "maxCenterPrice";
          type: "u64";
        },
        {
          name: "minCenterPrice";
          type: "u64";
        },
      ];
    },
    {
      name: "updateDexLookupTable";
      discriminator: [87, 149, 96, 95, 24, 20, 211, 43];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dexMetadata";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
      ];
      args: [
        {
          name: "dexId";
          type: "u16";
        },
        {
          name: "lookupTable";
          type: "pubkey";
        },
      ];
    },
    {
      name: "updateFeeAndRevenueCut";
      discriminator: [223, 251, 181, 7, 34, 61, 183, 122];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
      ];
      args: [
        {
          name: "fee";
          type: "u32";
        },
        {
          name: "revenueCut";
          type: "u32";
        },
      ];
    },
    {
      name: "updateGuardians";
      discriminator: [43, 62, 250, 138, 141, 117, 132, 97];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
          writable: true;
        },
      ];
      args: [
        {
          name: "guardianStatus";
          type: {
            vec: {
              defined: {
                name: "addressBool";
              };
            };
          };
        },
      ];
    },
    {
      name: "updateMaxBorrowShares";
      discriminator: [176, 13, 121, 189, 225, 225, 238, 78];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
      ];
      args: [
        {
          name: "maxBorrowShares";
          type: "u64";
        },
      ];
    },
    {
      name: "updateMaxSupplyShares";
      discriminator: [179, 157, 37, 206, 176, 51, 37, 79];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
      ];
      args: [
        {
          name: "maxSupplyShares";
          type: "u64";
        },
      ];
    },
    {
      name: "updateRangePercents";
      discriminator: [51, 233, 228, 43, 91, 7, 62, 20];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
      ];
      args: [
        {
          name: "upperPercent";
          type: "u32";
        },
        {
          name: "lowerPercent";
          type: "u32";
        },
        {
          name: "shiftTime";
          type: "u32";
        },
      ];
    },
    {
      name: "updateThresholdPercent";
      discriminator: [177, 125, 99, 134, 42, 254, 140, 234];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
      ];
      args: [
        {
          name: "upperThresholdPercent";
          type: "u32";
        },
        {
          name: "lowerThresholdPercent";
          type: "u32";
        },
        {
          name: "thresholdShiftTime";
          type: "u32";
        },
        {
          name: "shiftTime";
          type: "u32";
        },
      ];
    },
    {
      name: "updateUserBorrowConfig";
      discriminator: [100, 176, 201, 174, 247, 2, 54, 168];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
        },
        {
          name: "position";
          writable: true;
        },
      ];
      args: [
        {
          name: "config";
          type: {
            defined: {
              name: "userBorrowConfigParams";
            };
          };
        },
      ];
    },
    {
      name: "updateUserSupplyConfig";
      discriminator: [217, 239, 225, 218, 33, 49, 234, 183];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
        },
        {
          name: "position";
          writable: true;
        },
      ];
      args: [
        {
          name: "config";
          type: {
            defined: {
              name: "userSupplyConfigParams";
            };
          };
        },
      ];
    },
    {
      name: "updateUserWithdrawalLimit";
      discriminator: [162, 9, 186, 9, 213, 30, 173, 78];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
        },
        {
          name: "position";
          writable: true;
        },
      ];
      args: [
        {
          name: "newLimit";
          type: "u64";
        },
      ];
    },
    {
      name: "updateUtilizationLimit";
      discriminator: [48, 145, 0, 235, 118, 59, 55, 207];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "dexAdmin";
        },
        {
          name: "dex";
          writable: true;
        },
      ];
      args: [
        {
          name: "token0UtilizationLimit";
          type: "u16";
        },
        {
          name: "token1UtilizationLimit";
          type: "u16";
        },
      ];
    },
    {
      name: "withdraw";
      discriminator: [183, 18, 70, 156, 148, 109, 161, 34];
      accounts: [
        {
          name: "signer";
          docs: [
            "The protocol calling the operation (must match position.protocol)",
          ];
          writable: true;
          signer: true;
        },
        {
          name: "dex";
          docs: ["DEX pool state"];
          writable: true;
        },
        {
          name: "user";
          signer: true;
        },
        {
          name: "position";
          docs: ["The user's DexPosition (tracks shares and limits)"];
          writable: true;
        },
        {
          name: "userToken0Account";
          writable: true;
        },
        {
          name: "userToken1Account";
          writable: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          docs: ["Liquidity vault token account for tokens"];
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          docs: ["DEX's supply position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          docs: ["DEX's borrow position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "oracleProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientToken0Account";
          writable: true;
          optional: true;
        },
        {
          name: "recipientToken1Account";
          writable: true;
          optional: true;
        },
      ];
      args: [
        {
          name: "token0Amt";
          type: "u64";
        },
        {
          name: "token1Amt";
          type: "u64";
        },
        {
          name: "maxShares";
          type: "u64";
        },
      ];
      returns: "u128";
    },
    {
      name: "withdrawPerfect";
      discriminator: [41, 170, 122, 166, 20, 154, 180, 245];
      accounts: [
        {
          name: "signer";
          docs: [
            "The protocol calling the operation (must match position.protocol)",
          ];
          writable: true;
          signer: true;
        },
        {
          name: "dex";
          docs: ["DEX pool state"];
          writable: true;
        },
        {
          name: "user";
          signer: true;
        },
        {
          name: "position";
          docs: ["The user's DexPosition (tracks shares and limits)"];
          writable: true;
        },
        {
          name: "userToken0Account";
          writable: true;
        },
        {
          name: "userToken1Account";
          writable: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          docs: ["Liquidity vault token account for tokens"];
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          docs: ["DEX's supply position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          docs: ["DEX's borrow position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "oracleProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientToken0Account";
          writable: true;
          optional: true;
        },
        {
          name: "recipientToken1Account";
          writable: true;
          optional: true;
        },
      ];
      args: [
        {
          name: "shares";
          type: "u64";
        },
        {
          name: "minToken0";
          type: "u64";
        },
        {
          name: "minToken1";
          type: "u64";
        },
      ];
    },
    {
      name: "withdrawPerfectInOneToken";
      discriminator: [200, 72, 151, 197, 24, 15, 243, 165];
      accounts: [
        {
          name: "signer";
          docs: [
            "The protocol calling the operation (must match position.protocol)",
          ];
          writable: true;
          signer: true;
        },
        {
          name: "dex";
          docs: ["DEX pool state"];
          writable: true;
        },
        {
          name: "user";
          signer: true;
        },
        {
          name: "position";
          docs: ["The user's DexPosition (tracks shares and limits)"];
          writable: true;
        },
        {
          name: "userToken0Account";
          writable: true;
        },
        {
          name: "userToken1Account";
          writable: true;
        },
        {
          name: "token0";
        },
        {
          name: "token1";
        },
        {
          name: "token0Reserve";
          writable: true;
        },
        {
          name: "token1Reserve";
          writable: true;
        },
        {
          name: "token0RateModel";
        },
        {
          name: "token1RateModel";
        },
        {
          name: "token0Vault";
          docs: ["Liquidity vault token account for tokens"];
          writable: true;
        },
        {
          name: "token1Vault";
          writable: true;
        },
        {
          name: "dexSupplyPositionToken0";
          docs: ["DEX's supply position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexSupplyPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken0";
          docs: ["DEX's borrow position for tokens on liquidity"];
          writable: true;
          optional: true;
        },
        {
          name: "dexBorrowPositionToken1";
          writable: true;
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "oracleProgram";
        },
        {
          name: "token0Program";
        },
        {
          name: "token1Program";
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientToken0Account";
          writable: true;
          optional: true;
        },
        {
          name: "recipientToken1Account";
          writable: true;
          optional: true;
        },
      ];
      args: [
        {
          name: "shares";
          type: "u64";
        },
        {
          name: "minToken0";
          type: "u64";
        },
        {
          name: "minToken1";
          type: "u64";
        },
      ];
      returns: "u64";
    },
  ];
  accounts: [
    {
      name: "dex";
      discriminator: [236, 30, 181, 80, 209, 217, 25, 163];
    },
    {
      name: "dexAdmin";
      discriminator: [82, 155, 122, 221, 230, 96, 118, 155];
    },
    {
      name: "dexMetadata";
      discriminator: [177, 231, 57, 253, 64, 12, 205, 37];
    },
    {
      name: "dexPosition";
      discriminator: [30, 36, 219, 78, 189, 173, 170, 47];
    },
    {
      name: "tokenReserve";
      discriminator: [21, 18, 59, 135, 120, 20, 31, 12];
    },
    {
      name: "userBorrowPosition";
      discriminator: [73, 126, 65, 123, 220, 126, 197, 24];
    },
    {
      name: "userSupplyPosition";
      discriminator: [202, 219, 136, 118, 61, 177, 21, 146];
    },
  ];
  events: [
    {
      name: "logArbitrage";
      discriminator: [105, 165, 52, 9, 218, 211, 46, 13];
    },
    {
      name: "logBorrowDebtLiquidity";
      discriminator: [70, 124, 172, 119, 252, 91, 62, 4];
    },
    {
      name: "logBorrowPerfectDebtLiquidity";
      discriminator: [164, 250, 16, 192, 152, 3, 238, 107];
    },
    {
      name: "logDepositColLiquidity";
      discriminator: [162, 105, 100, 76, 89, 95, 69, 189];
    },
    {
      name: "logDepositPerfectColLiquidity";
      discriminator: [33, 91, 169, 231, 163, 83, 37, 254];
    },
    {
      name: "logInitDex";
      discriminator: [170, 65, 241, 125, 34, 194, 79, 132];
    },
    {
      name: "logInitDexMetadata";
      discriminator: [53, 61, 248, 111, 245, 219, 167, 73];
    },
    {
      name: "logInitDexPriceParams";
      discriminator: [154, 98, 101, 72, 8, 203, 37, 200];
    },
    {
      name: "logPauseDex";
      discriminator: [107, 202, 204, 255, 100, 73, 92, 117];
    },
    {
      name: "logPauseSwapAndArbitrage";
      discriminator: [103, 184, 228, 52, 0, 229, 4, 154];
    },
    {
      name: "logPauseUser";
      discriminator: [100, 17, 114, 224, 180, 30, 52, 170];
    },
    {
      name: "logPaybackDebtInOneToken";
      discriminator: [123, 31, 108, 14, 12, 201, 20, 83];
    },
    {
      name: "logPaybackDebtLiquidity";
      discriminator: [230, 190, 245, 114, 113, 92, 173, 27];
    },
    {
      name: "logPaybackPerfectDebtLiquidity";
      discriminator: [75, 233, 232, 38, 153, 31, 239, 109];
    },
    {
      name: "logSwap";
      discriminator: [202, 242, 228, 28, 37, 194, 52, 34];
    },
    {
      name: "logTurnOnSmartCol";
      discriminator: [108, 254, 255, 147, 80, 55, 98, 86];
    },
    {
      name: "logTurnOnSmartDebt";
      discriminator: [23, 36, 134, 104, 91, 138, 126, 124];
    },
    {
      name: "logUnpauseDex";
      discriminator: [6, 190, 255, 207, 165, 71, 170, 212];
    },
    {
      name: "logUnpauseSwapAndArbitrage";
      discriminator: [229, 120, 123, 188, 146, 222, 159, 255];
    },
    {
      name: "logUnpauseUser";
      discriminator: [170, 91, 132, 96, 179, 77, 168, 26];
    },
    {
      name: "logUpdateAuthority";
      discriminator: [150, 152, 157, 143, 6, 135, 193, 101];
    },
    {
      name: "logUpdateAuths";
      discriminator: [88, 80, 109, 48, 111, 203, 76, 251];
    },
    {
      name: "logUpdateCenterPriceAddress";
      discriminator: [96, 24, 207, 2, 38, 203, 43, 145];
    },
    {
      name: "logUpdateCenterPriceLimits";
      discriminator: [111, 228, 61, 31, 234, 76, 5, 17];
    },
    {
      name: "logUpdateDexLookupTable";
      discriminator: [135, 31, 232, 96, 2, 64, 116, 229];
    },
    {
      name: "logUpdateFeeAndRevenueCut";
      discriminator: [187, 9, 16, 229, 8, 231, 7, 171];
    },
    {
      name: "logUpdateGuardians";
      discriminator: [231, 28, 191, 51, 53, 140, 79, 142];
    },
    {
      name: "logUpdateMaxBorrowShares";
      discriminator: [22, 124, 242, 112, 255, 39, 100, 206];
    },
    {
      name: "logUpdateMaxSupplyShares";
      discriminator: [209, 150, 112, 193, 243, 63, 233, 212];
    },
    {
      name: "logUpdateRangePercents";
      discriminator: [149, 47, 161, 6, 129, 240, 48, 100];
    },
    {
      name: "logUpdateThresholdPercent";
      discriminator: [44, 46, 70, 115, 25, 38, 92, 99];
    },
    {
      name: "logUpdateUserBorrowConfig";
      discriminator: [70, 142, 184, 48, 44, 158, 166, 3];
    },
    {
      name: "logUpdateUserSupplyConfig";
      discriminator: [86, 139, 35, 235, 30, 42, 192, 245];
    },
    {
      name: "logUpdateUserWithdrawalLimit";
      discriminator: [114, 131, 152, 189, 120, 253, 88, 105];
    },
    {
      name: "logUpdateUtilizationLimit";
      discriminator: [153, 239, 227, 172, 250, 247, 155, 69];
    },
    {
      name: "logWithdrawColInOneToken";
      discriminator: [86, 6, 224, 183, 211, 209, 199, 232];
    },
    {
      name: "logWithdrawColLiquidity";
      discriminator: [29, 6, 184, 148, 156, 65, 164, 228];
    },
    {
      name: "logWithdrawPerfectColLiquidity";
      discriminator: [199, 40, 242, 90, 55, 165, 41, 105];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "dexCpiToOracleFailed";
      msg: "dexCpiToOracleFailed";
    },
    {
      code: 6001;
      name: "dexUserNotDefined";
      msg: "dexUserNotDefined";
    },
    {
      code: 6002;
      name: "dexUserMustSign";
      msg: "dexUserMustSign";
    },
    {
      code: 6003;
      name: "dexAdminLiquidityProgramMismatch";
      msg: "dexAdminLiquidityProgramMismatch";
    },
    {
      code: 6004;
      name: "dexAdminAddressZeroNotAllowed";
      msg: "dexAdminAddressZeroNotAllowed";
    },
    {
      code: 6005;
      name: "dexAdminNotAnAuth";
      msg: "dexAdminNotAnAuth";
    },
    {
      code: 6006;
      name: "dexAdminPoolNotInitialized";
      msg: "dexAdminPoolNotInitialized";
    },
    {
      code: 6007;
      name: "dexAdminSmartColAlreadyOn";
      msg: "dexAdminSmartColAlreadyOn";
    },
    {
      code: 6008;
      name: "dexAdminSmartDebtAlreadyOn";
      msg: "dexAdminSmartDebtAlreadyOn";
    },
    {
      code: 6009;
      name: "dexAdminConfigOverflow";
      msg: "dexAdminConfigOverflow";
    },
    {
      code: 6010;
      name: "dexAdminInvalidParams";
      msg: "dexAdminInvalidParams";
    },
    {
      code: 6011;
      name: "dexAdminUserNotDefined";
      msg: "dexAdminUserNotDefined";
    },
    {
      code: 6012;
      name: "dexAdminInvalidPauseToggle";
      msg: "dexAdminInvalidPauseToggle";
    },
    {
      code: 6013;
      name: "dexAdminUnexpectedPoolState";
      msg: "dexAdminUnexpectedPoolState";
    },
    {
      code: 6014;
      name: "dexAdminAddressNotAProgram";
      msg: "dexAdminAddressNotAProgram";
    },
    {
      code: 6015;
      name: "dexAdminInvalidTokenDecimals";
      msg: "dexAdminInvalidTokenDecimals";
    },
    {
      code: 6016;
      name: "dexAdminPreviousShiftStillActive";
      msg: "dexAdminPreviousShiftStillActive";
    },
    {
      code: 6017;
      name: "dexAlreadyEntered";
      msg: "dexAlreadyEntered";
    },
    {
      code: 6018;
      name: "dexNotAnAuth";
      msg: "dexNotAnAuth";
    },
    {
      code: 6019;
      name: "dexSmartColNotEnabled";
      msg: "dexSmartColNotEnabled";
    },
    {
      code: 6020;
      name: "dexSmartDebtNotEnabled";
      msg: "dexSmartDebtNotEnabled";
    },
    {
      code: 6021;
      name: "dexPoolNotInitialized";
      msg: "dexPoolNotInitialized";
    },
    {
      code: 6022;
      name: "dexTokenReservesTooLow";
      msg: "dexTokenReservesTooLow";
    },
    {
      code: 6023;
      name: "dexNoSwapRoute";
      msg: "dexNoSwapRoute";
    },
    {
      code: 6024;
      name: "dexNotEnoughAmountOut";
      msg: "dexNotEnoughAmountOut";
    },
    {
      code: 6025;
      name: "dexUtilizationCapReached";
      msg: "dexUtilizationCapReached";
    },
    {
      code: 6026;
      name: "dexUserSupplyNotOn";
      msg: "dexUserSupplyNotOn";
    },
    {
      code: 6027;
      name: "dexUserDebtNotOn";
      msg: "dexUserDebtNotOn";
    },
    {
      code: 6028;
      name: "dexAboveDepositMax";
      msg: "dexAboveDepositMax";
    },
    {
      code: 6029;
      name: "dexWithdrawalLimitReached";
      msg: "dexWithdrawalLimitReached";
    },
    {
      code: 6030;
      name: "dexBelowWithdrawMin";
      msg: "dexBelowWithdrawMin";
    },
    {
      code: 6031;
      name: "dexDebtLimitReached";
      msg: "dexDebtLimitReached";
    },
    {
      code: 6032;
      name: "dexBelowBorrowMin";
      msg: "dexBelowBorrowMin";
    },
    {
      code: 6033;
      name: "dexAbovePaybackMax";
      msg: "dexAbovePaybackMax";
    },
    {
      code: 6034;
      name: "dexInvalidDepositAmounts";
      msg: "dexInvalidDepositAmounts";
    },
    {
      code: 6035;
      name: "dexDepositAmountsZero";
      msg: "dexDepositAmountsZero";
    },
    {
      code: 6036;
      name: "dexSharesMintedLess";
      msg: "dexSharesMintedLess";
    },
    {
      code: 6037;
      name: "dexWithdrawalNotEnough";
      msg: "dexWithdrawalNotEnough";
    },
    {
      code: 6038;
      name: "dexInvalidWithdrawAmounts";
      msg: "dexInvalidWithdrawAmounts";
    },
    {
      code: 6039;
      name: "dexWithdrawAmountsZero";
      msg: "dexWithdrawAmountsZero";
    },
    {
      code: 6040;
      name: "dexWithdrawExcessSharesBurn";
      msg: "dexWithdrawExcessSharesBurn";
    },
    {
      code: 6041;
      name: "dexInvalidBorrowAmounts";
      msg: "dexInvalidBorrowAmounts";
    },
    {
      code: 6042;
      name: "dexBorrowAmountsZero";
      msg: "dexBorrowAmountsZero";
    },
    {
      code: 6043;
      name: "dexBorrowExcessSharesMinted";
      msg: "dexBorrowExcessSharesMinted";
    },
    {
      code: 6044;
      name: "dexInvalidPaybackAmounts";
      msg: "dexInvalidPaybackAmounts";
    },
    {
      code: 6045;
      name: "dexPaybackAmountsZero";
      msg: "dexPaybackAmountsZero";
    },
    {
      code: 6046;
      name: "dexPaybackSharesBurnedLess";
      msg: "dexPaybackSharesBurnedLess";
    },
    {
      code: 6047;
      name: "dexNothingToArbitrage";
      msg: "dexNothingToArbitrage";
    },
    {
      code: 6048;
      name: "dexOracleUpdateHugeSwapDiff";
      msg: "dexOracleUpdateHugeSwapDiff";
    },
    {
      code: 6049;
      name: "dexToken0ShouldBeSmallerThanToken1";
      msg: "dexToken0ShouldBeSmallerThanToken1";
    },
    {
      code: 6050;
      name: "dexSwapAndArbitragePaused";
      msg: "dexSwapAndArbitragePaused";
    },
    {
      code: 6051;
      name: "dexExceedsAmountInMax";
      msg: "dexExceedsAmountInMax";
    },
    {
      code: 6052;
      name: "dexSwapInLimitingAmounts";
      msg: "dexSwapInLimitingAmounts";
    },
    {
      code: 6053;
      name: "dexSwapOutLimitingAmounts";
      msg: "dexSwapOutLimitingAmounts";
    },
    {
      code: 6054;
      name: "dexSupplySharesOverflow";
      msg: "dexSupplySharesOverflow";
    },
    {
      code: 6055;
      name: "dexBorrowSharesOverflow";
      msg: "dexBorrowSharesOverflow";
    },
    {
      code: 6056;
      name: "dexCenterPriceOutOfRange";
      msg: "dexCenterPriceOutOfRange";
    },
    {
      code: 6057;
      name: "dexDebtReservesTooLow";
      msg: "dexDebtReservesTooLow";
    },
    {
      code: 6058;
      name: "dexInvalidCollateralReserves";
      msg: "dexInvalidCollateralReserves";
    },
    {
      code: 6059;
      name: "dexInvalidDebtReserves";
      msg: "dexInvalidDebtReserves";
    },
    {
      code: 6060;
      name: "dexLimitingAmountsSwapAndNonPerfect";
      msg: "dexLimitingAmountsSwapAndNonPerfect";
    },
    {
      code: 6061;
      name: "dexMintOverflow";
      msg: "dexMintOverflow";
    },
    {
      code: 6062;
      name: "dexBurnOverflow";
      msg: "dexBurnOverflow";
    },
    {
      code: 6063;
      name: "dexSharesAmountInsufficient";
      msg: "dexSharesAmountInsufficient";
    },
    {
      code: 6064;
      name: "dexPerfectNativeAmountsRoundToZero";
      msg: "dexPerfectNativeAmountsRoundToZero";
    },
    {
      code: 6065;
      name: "dexCpiToLiquidityFailed";
      msg: "dexCpiToLiquidityFailed";
    },
    {
      code: 6066;
      name: "dexInvalidTokenAccount";
      msg: "dexInvalidTokenAccount";
    },
    {
      code: 6067;
      name: "dexMissingExternalCenterPrice";
      msg: "dexMissingExternalCenterPrice";
    },
    {
      code: 6068;
      name: "dexInvalidExternalCenterPrice";
      msg: "dexInvalidExternalCenterPrice";
    },
    {
      code: 6069;
      name: "dexPaybackAmtTooHigh";
      msg: "dexPaybackAmtTooHigh";
    },
    {
      code: 6070;
      name: "dexSwapAndPaybackTooLowOrTooHigh";
      msg: "dexSwapAndPaybackTooLowOrTooHigh";
    },
    {
      code: 6071;
      name: "dexValidateInvalidDexId";
      msg: "dexInvalidDexId";
    },
    {
      code: 6072;
      name: "dexValidateInvalidToken0";
      msg: "dexInvalidToken0";
    },
    {
      code: 6073;
      name: "dexValidateInvalidToken1";
      msg: "dexInvalidToken1";
    },
    {
      code: 6074;
      name: "dexValidateInvalidPosition";
      msg: "dexInvalidPosition";
    },
    {
      code: 6075;
      name: "dexValidateInvalidLiquidityProgram";
      msg: "dexInvalidLiquidityProgram";
    },
    {
      code: 6076;
      name: "dexValidateInvalidOracleProgram";
      msg: "dexInvalidOracleProgram";
    },
    {
      code: 6077;
      name: "dexValidateInvalidLiquidityPosition";
      msg: "dexInvalidLiquidityPosition";
    },
    {
      code: 6078;
      name: "dexValidateMissingLiquidityPosition";
      msg: "dexMissingLiquidityPosition";
    },
    {
      code: 6079;
      name: "dexInvalidRecipientPositionWithdraw";
      msg: "dexInvalidRecipientPositionWithdraw";
    },
    {
      code: 6080;
      name: "dexInvalidRecipientPositionBorrow";
      msg: "dexInvalidRecipientPositionBorrow";
    },
    {
      code: 6081;
      name: "dexSwapInResult";
      msg: "dexSwapInResult";
    },
    {
      code: 6082;
      name: "dexSwapOutResult";
      msg: "dexSwapOutResult";
    },
    {
      code: 6083;
      name: "dexAdminDexIdMismatch";
      msg: "dexAdminDexIdMismatch";
    },
    {
      code: 6084;
      name: "dexAdminNotAnAuthOrGuardian";
      msg: "dexAdminNotAnAuthOrGuardian";
    },
  ];
  types: [
    {
      name: "addressBool";
      type: {
        kind: "struct";
        fields: [
          {
            name: "addr";
            type: "pubkey";
          },
          {
            name: "value";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "dex";
      docs: [
        "Core DEX pool state. One per trading pair.",
        "Uses zero_copy for efficient access without deserialization overhead.",
      ];
      serialization: "bytemuck";
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "reEntrancy";
            type: "u8";
          },
          {
            name: "token0";
            type: "pubkey";
          },
          {
            name: "token1";
            type: "pubkey";
          },
          {
            name: "token0Decimals";
            type: "u8";
          },
          {
            name: "token1Decimals";
            type: "u8";
          },
          {
            name: "lastToLastStoredPrice";
            type: "u128";
          },
          {
            name: "lastStoredPrice";
            type: "u128";
          },
          {
            name: "centerPrice";
            type: "u128";
          },
          {
            name: "lastUpdateTimestamp";
            type: "u64";
          },
          {
            name: "lastUpdateSlot";
            type: "u64";
          },
          {
            name: "isSmartCollateralEnabled";
            type: "u8";
          },
          {
            name: "isSmartDebtEnabled";
            type: "u8";
          },
          {
            name: "fee";
            type: "u32";
          },
          {
            name: "revenueCut";
            type: "u8";
          },
          {
            name: "percentChangeActive";
            type: "u8";
          },
          {
            name: "upperPercent";
            type: "u32";
          },
          {
            name: "lowerPercent";
            type: "u32";
          },
          {
            name: "thresholdChangeActive";
            type: "u8";
          },
          {
            name: "upperShiftThresholdPercent";
            type: "u16";
          },
          {
            name: "lowerShiftThresholdPercent";
            type: "u16";
          },
          {
            name: "shiftingTime";
            type: "u32";
          },
          {
            name: "centerPriceAddress";
            type: "pubkey";
          },
          {
            name: "maxCenterPrice";
            type: "u64";
          },
          {
            name: "minCenterPrice";
            type: "u64";
          },
          {
            name: "token0MaxUtilization";
            type: "u16";
          },
          {
            name: "token1MaxUtilization";
            type: "u16";
          },
          {
            name: "isCenterPriceShiftActive";
            type: "u8";
          },
          {
            name: "swapAndArbitragePaused";
            type: "u8";
          },
          {
            name: "totalSupplyShares";
            type: "u64";
          },
          {
            name: "maxSupplyShares";
            type: "u64";
          },
          {
            name: "totalBorrowShares";
            type: "u64";
          },
          {
            name: "maxBorrowShares";
            type: "u64";
          },
          {
            name: "rangeOldUpperShift";
            type: "u32";
          },
          {
            name: "rangeOldLowerShift";
            type: "u32";
          },
          {
            name: "rangeShiftDuration";
            type: "u32";
          },
          {
            name: "rangeShiftStartTimestamp";
            type: "u32";
          },
          {
            name: "thresholdOldUpperShift";
            type: "u16";
          },
          {
            name: "thresholdOldLowerShift";
            type: "u16";
          },
          {
            name: "thresholdShiftDuration";
            type: "u32";
          },
          {
            name: "thresholdShiftStartTimestamp";
            type: "u32";
          },
          {
            name: "thresholdShiftOldTimestamp";
            type: "u32";
          },
          {
            name: "centerPriceShiftStartTimestamp";
            type: "u32";
          },
          {
            name: "centerPriceShiftPercent";
            type: "u32";
          },
          {
            name: "centerPriceShiftTime";
            type: "u32";
          },
          {
            name: "reserved";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "dexAdmin";
      docs: ["DEX factory/admin account."];
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "liquidityProgram";
            type: "pubkey";
          },
          {
            name: "nextDexId";
            type: "u16";
          },
          {
            name: "auths";
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "guardians";
            docs: ["Guardians can pause a dex; unpause remains auth-only."];
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "reserved";
            type: {
              array: ["u8", 28];
            };
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "dexMetadata";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "lookupTable";
            type: "pubkey";
          },
          {
            name: "reserved";
            type: {
              array: ["u8", 32];
            };
          },
        ];
      };
    },
    {
      name: "dexPosition";
      docs: [
        "Per-protocol per-DEX position.",
        "Seeds: [DEX_POSITION_SEED, dex.key(), protocol.key()]",
      ];
      serialization: "bytemuck";
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
          {
            name: "supplyStatus";
            type: "u8";
          },
          {
            name: "supplyShares";
            type: "u64";
          },
          {
            name: "withdrawalLimit";
            type: "u64";
          },
          {
            name: "supplyLastUpdate";
            type: "u64";
          },
          {
            name: "supplyExpandPct";
            type: "u16";
          },
          {
            name: "supplyExpandDuration";
            type: "u64";
          },
          {
            name: "baseWithdrawalLimit";
            type: "u64";
          },
          {
            name: "borrowStatus";
            type: "u8";
          },
          {
            name: "borrowShares";
            type: "u64";
          },
          {
            name: "debtCeiling";
            type: "u64";
          },
          {
            name: "borrowLastUpdate";
            type: "u64";
          },
          {
            name: "borrowExpandPct";
            type: "u16";
          },
          {
            name: "borrowExpandDuration";
            type: "u32";
          },
          {
            name: "baseDebtCeiling";
            type: "u64";
          },
          {
            name: "maxDebtCeiling";
            type: "u64";
          },
          {
            name: "reserved";
            type: {
              array: ["u8", 32];
            };
          },
        ];
      };
    },
    {
      name: "initDexParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "centerPrice";
            docs: [
              "Initial center price: a normalized ratio scaled by PRICE_PRECISION (10^15)",
            ];
            type: "u64";
          },
          {
            name: "fee";
            docs: ["Fee in 4 decimals: 1% = 10000, max 10% = 100000"];
            type: "u32";
          },
          {
            name: "revenueCut";
            docs: [
              "Revenue cut in 4 decimals (e.g., 100000 = 10%). Divided by 10000 for storage.",
            ];
            type: "u32";
          },
          {
            name: "upperPercent";
            docs: ["Upper range percent in 4 decimals: 1% = 10000"];
            type: "u32";
          },
          {
            name: "lowerPercent";
            docs: ["Lower range percent in 4 decimals: 1% = 10000"];
            type: "u32";
          },
          {
            name: "upperShiftThreshold";
            docs: [
              "Upper shift threshold percent in 4 decimals. Divided by 1000 for storage.",
            ];
            type: "u32";
          },
          {
            name: "lowerShiftThreshold";
            docs: [
              "Lower shift threshold percent in 4 decimals. Divided by 1000 for storage.",
            ];
            type: "u32";
          },
          {
            name: "thresholdShiftTime";
            docs: ["Time (seconds) for threshold-based center price shift"];
            type: "u32";
          },
          {
            name: "maxCenterPrice";
            docs: ["Maximum center price"];
            type: "u64";
          },
          {
            name: "minCenterPrice";
            docs: ["Minimum center price"];
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logArbitrage";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "routing";
            type: "i128";
          },
          {
            name: "amtOut";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logBorrowDebtLiquidity";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "amount0";
            type: "u64";
          },
          {
            name: "amount1";
            type: "u64";
          },
          {
            name: "shares";
            type: "u64";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logBorrowPerfectDebtLiquidity";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "shares";
            type: "u64";
          },
          {
            name: "token0Amt";
            type: "u64";
          },
          {
            name: "token1Amt";
            type: "u64";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logDepositColLiquidity";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "amount0";
            type: "u64";
          },
          {
            name: "amount1";
            type: "u64";
          },
          {
            name: "shares";
            type: "u64";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logDepositPerfectColLiquidity";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "shares";
            type: "u64";
          },
          {
            name: "token0Amt";
            type: "u64";
          },
          {
            name: "token1Amt";
            type: "u64";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logInitDex";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "token0";
            type: "pubkey";
          },
          {
            name: "token1";
            type: "pubkey";
          },
          {
            name: "smartCol";
            type: "bool";
          },
          {
            name: "smartDebt";
            type: "bool";
          },
          {
            name: "fee";
            type: "u32";
          },
          {
            name: "revenueCut";
            type: "u32";
          },
          {
            name: "centerPrice";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logInitDexMetadata";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "lookupTable";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logInitDexPriceParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "upperPercent";
            type: "u32";
          },
          {
            name: "lowerPercent";
            type: "u32";
          },
          {
            name: "upperShiftThreshold";
            type: "u32";
          },
          {
            name: "lowerShiftThreshold";
            type: "u32";
          },
          {
            name: "thresholdShiftTime";
            type: "u32";
          },
          {
            name: "maxCenterPrice";
            type: "u64";
          },
          {
            name: "minCenterPrice";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logPauseDex";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "logPauseSwapAndArbitrage";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "logPauseUser";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
          {
            name: "pauseSupply";
            type: "bool";
          },
          {
            name: "pauseBorrow";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "logPaybackDebtInOneToken";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "shares";
            type: "u64";
          },
          {
            name: "token0Amt";
            type: "u64";
          },
          {
            name: "token1Amt";
            type: "u64";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logPaybackDebtLiquidity";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "amount0";
            type: "u64";
          },
          {
            name: "amount1";
            type: "u64";
          },
          {
            name: "shares";
            type: "u64";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logPaybackPerfectDebtLiquidity";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "shares";
            type: "u64";
          },
          {
            name: "token0Amt";
            type: "u64";
          },
          {
            name: "token1Amt";
            type: "u64";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logSwap";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "swap0To1";
            type: "bool";
          },
          {
            name: "amountIn";
            type: "u64";
          },
          {
            name: "amountOut";
            type: "u64";
          },
          {
            name: "to";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logTurnOnSmartCol";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "token0Amt";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logTurnOnSmartDebt";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "token0Amt";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logUnpauseDex";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "logUnpauseSwapAndArbitrage";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "logUnpauseUser";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
          {
            name: "unpauseSupply";
            type: "bool";
          },
          {
            name: "unpauseBorrow";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "logUpdateAuthority";
      type: {
        kind: "struct";
        fields: [
          {
            name: "newAuthority";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logUpdateAuths";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authStatus";
            type: {
              vec: {
                defined: {
                  name: "addressBool";
                };
              };
            };
          },
        ];
      };
    },
    {
      name: "logUpdateCenterPriceAddress";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "centerPriceAddress";
            type: "pubkey";
          },
          {
            name: "percent";
            type: "u32";
          },
          {
            name: "time";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "logUpdateCenterPriceLimits";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "maxCenterPrice";
            type: "u64";
          },
          {
            name: "minCenterPrice";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logUpdateDexLookupTable";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "lookupTable";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logUpdateFeeAndRevenueCut";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "fee";
            type: "u32";
          },
          {
            name: "revenueCut";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "logUpdateGuardians";
      type: {
        kind: "struct";
        fields: [
          {
            name: "guardianStatus";
            type: {
              vec: {
                defined: {
                  name: "addressBool";
                };
              };
            };
          },
        ];
      };
    },
    {
      name: "logUpdateMaxBorrowShares";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "maxBorrowShares";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logUpdateMaxSupplyShares";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "maxSupplyShares";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logUpdateRangePercents";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "upperPercent";
            type: "u32";
          },
          {
            name: "lowerPercent";
            type: "u32";
          },
          {
            name: "shiftTime";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "logUpdateThresholdPercent";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "upperThresholdPercent";
            type: "u32";
          },
          {
            name: "lowerThresholdPercent";
            type: "u32";
          },
          {
            name: "thresholdShiftTime";
            type: "u32";
          },
          {
            name: "shiftTime";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "logUpdateUserBorrowConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
          {
            name: "expandPercent";
            type: "u16";
          },
          {
            name: "expandDuration";
            type: "u32";
          },
          {
            name: "baseDebtCeiling";
            type: "u64";
          },
          {
            name: "maxDebtCeiling";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logUpdateUserSupplyConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
          {
            name: "expandPercent";
            type: "u16";
          },
          {
            name: "expandDuration";
            type: "u64";
          },
          {
            name: "baseWithdrawalLimit";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logUpdateUserWithdrawalLimit";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
          {
            name: "newLimit";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logUpdateUtilizationLimit";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "token0UtilizationLimit";
            type: "u16";
          },
          {
            name: "token1UtilizationLimit";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "logWithdrawColInOneToken";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "shares";
            type: "u64";
          },
          {
            name: "token0Amt";
            type: "u64";
          },
          {
            name: "token1Amt";
            type: "u64";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logWithdrawColLiquidity";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "amount0";
            type: "u64";
          },
          {
            name: "amount1";
            type: "u64";
          },
          {
            name: "shares";
            type: "u64";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logWithdrawPerfectColLiquidity";
      type: {
        kind: "struct";
        fields: [
          {
            name: "dexId";
            type: "u16";
          },
          {
            name: "shares";
            type: "u64";
          },
          {
            name: "token0Amt";
            type: "u64";
          },
          {
            name: "token1Amt";
            type: "u64";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "protocol";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "tokenReserve";
      docs: ["Token configuration and exchange prices"];
      serialization: "bytemuck";
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "vault";
            type: "pubkey";
          },
          {
            name: "borrowRate";
            type: "u16";
          },
          {
            name: "feeOnInterest";
            type: "u16";
          },
          {
            name: "lastUtilization";
            type: "u16";
          },
          {
            name: "lastUpdateTimestamp";
            type: "u64";
          },
          {
            name: "supplyExchangePrice";
            type: "u64";
          },
          {
            name: "borrowExchangePrice";
            type: "u64";
          },
          {
            name: "maxUtilization";
            type: "u16";
          },
          {
            name: "totalSupplyWithInterest";
            type: "u64";
          },
          {
            name: "totalSupplyInterestFree";
            type: "u64";
          },
          {
            name: "totalBorrowWithInterest";
            type: "u64";
          },
          {
            name: "totalBorrowInterestFree";
            type: "u64";
          },
          {
            name: "totalClaimAmount";
            type: "u64";
          },
          {
            name: "interactingProtocol";
            type: "pubkey";
          },
          {
            name: "interactingTimestamp";
            type: "u64";
          },
          {
            name: "interactingBalance";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "userBorrowConfigParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "expandPercent";
            type: "u16";
          },
          {
            name: "expandDuration";
            type: "u32";
          },
          {
            name: "baseDebtCeiling";
            type: "u64";
          },
          {
            name: "maxDebtCeiling";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "userBorrowPosition";
      docs: ["User borrow position"];
      serialization: "bytemuck";
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "protocol";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "withInterest";
            type: "u8";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "debtCeiling";
            type: "u64";
          },
          {
            name: "lastUpdate";
            type: "u64";
          },
          {
            name: "expandPct";
            type: "u16";
          },
          {
            name: "expandDuration";
            type: "u32";
          },
          {
            name: "baseDebtCeiling";
            type: "u64";
          },
          {
            name: "maxDebtCeiling";
            type: "u64";
          },
          {
            name: "status";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "userSupplyConfigParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "expandPercent";
            type: "u16";
          },
          {
            name: "expandDuration";
            type: "u64";
          },
          {
            name: "baseWithdrawalLimit";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "userSupplyPosition";
      docs: ["User supply position"];
      serialization: "bytemuck";
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "protocol";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "withInterest";
            type: "u8";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "withdrawalLimit";
            type: "u64";
          },
          {
            name: "decayAmount";
            type: "u64";
          },
          {
            name: "lastUpdate";
            type: "u64";
          },
          {
            name: "expandPct";
            type: "u16";
          },
          {
            name: "expandDuration";
            type: "u32";
          },
          {
            name: "decayDuration";
            type: "u32";
          },
          {
            name: "baseWithdrawalLimit";
            type: "u64";
          },
          {
            name: "status";
            type: "u8";
          },
        ];
      };
    },
  ];
};
