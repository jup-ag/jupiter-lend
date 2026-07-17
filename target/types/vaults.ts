/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/vaults.json`.
 */
export type Vaults = {
  address: "jupr81YtYssSyPt8jbnGuiWon5f6x9TcDEFxYe3Bdzi";
  metadata: {
    name: "vaults";
    version: "0.1.5";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "getExchangePrices";
      discriminator: [237, 128, 83, 152, 52, 21, 231, 86];
      accounts: [
        {
          name: "vaultState";
        },
        {
          name: "vaultConfig";
        },
        {
          name: "supplyTokenReserves";
        },
        {
          name: "borrowTokenReserves";
        },
      ];
      args: [];
    },
    {
      name: "initBranch";
      discriminator: [162, 91, 57, 23, 228, 93, 111, 21];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "branch";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [98, 114, 97, 110, 99, 104];
              },
              {
                kind: "arg";
                path: "vaultId";
              },
              {
                kind: "arg";
                path: "branchId";
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
          name: "vaultId";
          type: "u16";
        },
        {
          name: "branchId";
          type: "u32";
        },
      ];
    },
    {
      name: "initPosition";
      discriminator: [197, 20, 10, 1, 97, 160, 177, 91];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "position";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [112, 111, 115, 105, 116, 105, 111, 110];
              },
              {
                kind: "arg";
                path: "vaultId";
              },
              {
                kind: "arg";
                path: "nextPositionId";
              },
            ];
          };
        },
        {
          name: "positionMint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110,
                  95,
                  109,
                  105,
                  110,
                  116,
                ];
              },
              {
                kind: "arg";
                path: "vaultId";
              },
              {
                kind: "arg";
                path: "nextPositionId";
              },
            ];
          };
        },
        {
          name: "positionTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "signer";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ];
              },
              {
                kind: "account";
                path: "positionMint";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "metadataAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 101, 116, 97, 100, 97, 116, 97];
              },
              {
                kind: "const";
                value: [
                  11,
                  112,
                  101,
                  177,
                  227,
                  209,
                  124,
                  69,
                  56,
                  157,
                  82,
                  127,
                  107,
                  4,
                  195,
                  205,
                  88,
                  184,
                  108,
                  115,
                  26,
                  160,
                  253,
                  181,
                  73,
                  182,
                  209,
                  188,
                  3,
                  248,
                  41,
                  70,
                ];
              },
              {
                kind: "account";
                path: "positionMint";
              },
            ];
            program: {
              kind: "const";
              value: [
                11,
                112,
                101,
                177,
                227,
                209,
                124,
                69,
                56,
                157,
                82,
                127,
                107,
                4,
                195,
                205,
                88,
                184,
                108,
                115,
                26,
                160,
                253,
                181,
                73,
                182,
                209,
                188,
                3,
                248,
                41,
                70,
              ];
            };
          };
        },
        {
          name: "tokenProgram";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "sysvarInstruction";
          address: "Sysvar1nstructions1111111111111111111111111";
        },
        {
          name: "metadataProgram";
          address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "nextPositionId";
          type: "u32";
        },
      ];
    },
    {
      name: "initTick";
      discriminator: [22, 13, 62, 141, 73, 89, 178, 29];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "tickData";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "tick";
          type: "i32";
        },
      ];
    },
    {
      name: "initTickHasDebtArray";
      discriminator: [206, 108, 146, 245, 20, 0, 141, 208];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "tickHasDebtArray";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  116,
                  105,
                  99,
                  107,
                  95,
                  104,
                  97,
                  115,
                  95,
                  100,
                  101,
                  98,
                  116,
                ];
              },
              {
                kind: "arg";
                path: "vaultId";
              },
              {
                kind: "arg";
                path: "index";
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
          name: "vaultId";
          type: "u16";
        },
        {
          name: "index";
          type: "u8";
        },
      ];
    },
    {
      name: "initTickIdLiquidation";
      discriminator: [56, 110, 121, 169, 152, 241, 86, 183];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "tickData";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "tickIdLiquidation";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "tick";
          type: "i32";
        },
        {
          name: "totalIds";
          type: "u32";
        },
      ];
    },
    {
      name: "initVaultAdmin";
      discriminator: [22, 133, 2, 244, 123, 100, 249, 230];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "vaultAdmin";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116, 95, 97, 100, 109, 105, 110];
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
      name: "initVaultConfig";
      discriminator: [41, 194, 69, 254, 196, 246, 226, 195];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "vaultAdmin";
          writable: true;
        },
        {
          name: "vaultConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  99,
                  111,
                  110,
                  102,
                  105,
                  103,
                ];
              },
              {
                kind: "arg";
                path: "vaultId";
              },
            ];
          };
        },
        {
          name: "vaultMetadata";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  109,
                  101,
                  116,
                  97,
                  100,
                  97,
                  116,
                  97,
                ];
              },
              {
                kind: "arg";
                path: "vaultId";
              },
            ];
          };
        },
        {
          name: "oracle";
        },
        {
          name: "supplyToken";
          optional: true;
        },
        {
          name: "borrowToken";
          optional: true;
        },
        {
          name: "supplyDex";
          optional: true;
        },
        {
          name: "borrowDex";
          optional: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "params";
          type: {
            defined: {
              name: "initVaultConfigParams";
            };
          };
        },
      ];
    },
    {
      name: "initVaultState";
      discriminator: [96, 120, 23, 100, 153, 11, 13, 165];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "vaultState";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116, 95, 115, 116, 97, 116, 101];
              },
              {
                kind: "arg";
                path: "vaultId";
              },
            ];
          };
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
      ];
    },
    {
      name: "liquidate";
      discriminator: [223, 179, 226, 125, 48, 46, 39, 74];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerTokenAccount";
          writable: true;
        },
        {
          name: "to";
        },
        {
          name: "toTokenAccount";
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: [
            "@dev mut because this PDA signs the CPI to liquidity program",
            "@dev verification inside instruction logic",
          ];
        },
        {
          name: "vaultState";
          writable: true;
        },
        {
          name: "supplyToken";
        },
        {
          name: "borrowToken";
        },
        {
          name: "oracle";
        },
        {
          name: "newBranch";
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          writable: true;
        },
        {
          name: "borrowTokenReservesLiquidity";
          writable: true;
        },
        {
          name: "vaultSupplyPositionOnLiquidity";
          writable: true;
        },
        {
          name: "vaultBorrowPositionOnLiquidity";
          writable: true;
        },
        {
          name: "supplyRateModel";
        },
        {
          name: "borrowRateModel";
        },
        {
          name: "supplyTokenClaimAccount";
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
          name: "vaultSupplyTokenAccount";
          writable: true;
        },
        {
          name: "vaultBorrowTokenAccount";
          writable: true;
        },
        {
          name: "supplyTokenProgram";
        },
        {
          name: "borrowTokenProgram";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "associatedTokenProgram";
          optional: true;
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "oracleProgram";
        },
      ];
      args: [
        {
          name: "debtAmt";
          type: "u64";
        },
        {
          name: "colPerUnitDebt";
          type: "u128";
        },
        {
          name: "absorb";
          type: "bool";
        },
        {
          name: "transferType";
          type: {
            option: {
              defined: {
                name: "transferType";
              };
            };
          };
        },
        {
          name: "remainingAccountsIndices";
          type: "bytes";
        },
      ];
    },
    {
      name: "liquidateDex";
      docs: [
        "Typed vault imperfect liquidation (T2 / T3 / T4).",
        "",
        "- T2 (smart col, normal debt): supply `debt_amt` + `col_amounts`.",
        "- T3 (normal col, smart debt): supply `debt_amounts` (pre-fund vault's borrow-DEX",
        "user token accounts in the same tx).",
        "- T4 (smart col + smart debt): supply both `debt_amounts` and `col_amounts`.",
        "",
        "Returns `(actual_debt, actual_col, token0_col, token1_col)`.",
      ];
      discriminator: [28, 129, 253, 125, 243, 52, 11, 162];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerTokenAccount";
          docs: ["@dev not required for T3/T4 (smart debt pays at DEX)"];
          writable: true;
          optional: true;
        },
        {
          name: "to";
          docs: [
            "",
            "NOTE (Solana vs EVM): non-smart-leg collateral goes to `to_token_account`.",
            "Smart-col collateral seized via the DEX CPI also follows `to` (EVM `to_`",
            "parity) — but only when the supply leg's `dex_recipient_token0/1_account`",
            "are supplied; without them the DEX credits the liquidator *signer*'s",
            "pool token accounts. Smart-debt paybacks always pull from the signer.",
          ];
        },
        {
          name: "toTokenAccount";
          docs: ["@dev not required for T2/T4 (smart col withdraws at DEX)"];
          writable: true;
          optional: true;
        },
        {
          name: "vaultConfig";
          docs: [
            "@dev mut because this PDA signs CPIs to the DEX and liquidity programs",
          ];
          writable: true;
        },
        {
          name: "vaultState";
          writable: true;
        },
        {
          name: "supplyToken";
          docs: ["@dev not required for T2/T4"];
          optional: true;
        },
        {
          name: "borrowToken";
          docs: ["@dev not required for T3/T4"];
          optional: true;
        },
        {
          name: "oracle";
        },
        {
          name: "newBranch";
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev not required for T2/T4"];
          writable: true;
          optional: true;
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev not required for T3/T4"];
          writable: true;
          optional: true;
        },
        {
          name: "vaultSupplyPositionOnLiquidity";
          docs: ["@dev not required for T2/T4"];
          writable: true;
          optional: true;
        },
        {
          name: "vaultBorrowPositionOnLiquidity";
          docs: ["@dev not required for T3/T4"];
          writable: true;
          optional: true;
        },
        {
          name: "supplyRateModel";
          optional: true;
        },
        {
          name: "borrowRateModel";
          optional: true;
        },
        {
          name: "supplyTokenClaimAccount";
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
          name: "vaultSupplyTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "vaultBorrowTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "supplyTokenProgram";
          optional: true;
        },
        {
          name: "borrowTokenProgram";
          optional: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "oracleProgram";
        },
        {
          name: "supplyDex";
          accounts: [
            {
              name: "dex";
              writable: true;
              optional: true;
            },
            {
              name: "dexPosition";
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken0Account";
              docs: ["Signer's token0 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken1Account";
              docs: ["Signer's token1 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0";
              optional: true;
            },
            {
              name: "dexToken1";
              optional: true;
            },
            {
              name: "dexToken0Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0RateModel";
              optional: true;
            },
            {
              name: "dexToken1RateModel";
              optional: true;
            },
            {
              name: "dexToken0Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token0",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token1",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken0";
              docs: [
                "This pool's own LL **supply** position for token0 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken1";
              docs: [
                "This pool's own LL **supply** position for token1 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken0";
              docs: [
                "This pool's own LL **borrow** position for token0 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken1";
              docs: [
                "This pool's own LL **borrow** position for token1 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0Program";
              optional: true;
            },
            {
              name: "dexToken1Program";
              optional: true;
            },
            {
              name: "dexRecipientToken0Account";
              docs: [
                "Recipient's token0 account for this leg's withdraw/borrow OUTPUTS.",
                "Optional: outputs default to the signer's `dex_user_token0_account`.",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexRecipientToken1Account";
              docs: [
                "Recipient's token1 account for this leg's withdraw/borrow OUTPUTS.",
              ];
              writable: true;
              optional: true;
            },
          ];
        },
        {
          name: "borrowDex";
          accounts: [
            {
              name: "dex";
              writable: true;
              optional: true;
            },
            {
              name: "dexPosition";
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken0Account";
              docs: ["Signer's token0 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken1Account";
              docs: ["Signer's token1 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0";
              optional: true;
            },
            {
              name: "dexToken1";
              optional: true;
            },
            {
              name: "dexToken0Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0RateModel";
              optional: true;
            },
            {
              name: "dexToken1RateModel";
              optional: true;
            },
            {
              name: "dexToken0Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token0",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token1",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken0";
              docs: [
                "This pool's own LL **supply** position for token0 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken1";
              docs: [
                "This pool's own LL **supply** position for token1 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken0";
              docs: [
                "This pool's own LL **borrow** position for token0 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken1";
              docs: [
                "This pool's own LL **borrow** position for token1 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0Program";
              optional: true;
            },
            {
              name: "dexToken1Program";
              optional: true;
            },
            {
              name: "dexRecipientToken0Account";
              docs: [
                "Recipient's token0 account for this leg's withdraw/borrow OUTPUTS.",
                "Optional: outputs default to the signer's `dex_user_token0_account`.",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexRecipientToken1Account";
              docs: [
                "Recipient's token1 account for this leg's withdraw/borrow OUTPUTS.",
              ];
              writable: true;
              optional: true;
            },
          ];
        },
        {
          name: "dexProgram";
        },
        {
          name: "dexOracleProgram";
          optional: true;
        },
      ];
      args: [
        {
          name: "debtAmt";
          type: "u64";
        },
        {
          name: "debtAmounts";
          type: {
            option: {
              defined: {
                name: "liquidateDexDebtAmounts";
              };
            };
          };
        },
        {
          name: "colPerUnitDebt";
          type: "u128";
        },
        {
          name: "colAmounts";
          type: {
            option: {
              defined: {
                name: "liquidateDexColAmounts";
              };
            };
          };
        },
        {
          name: "absorb";
          type: "bool";
        },
        {
          name: "transferType";
          type: {
            option: {
              defined: {
                name: "transferType";
              };
            };
          };
        },
        {
          name: "remainingAccountsIndices";
          type: "bytes";
        },
      ];
    },
    {
      name: "liquidatePerfectDex";
      docs: [
        "Typed vault perfect liquidation (T2 / T3 / T4).",
        "",
        "- T2 (smart col, normal debt): supply `debt_amt` + `col_amounts`",
        "(`debt_perfect_amounts` = `None`).",
        "- T3 (normal col, smart debt): supply `debt_amt` = DEX debt shares +",
        "`debt_perfect_amounts` (pre-fund vault's borrow-DEX user token accounts).",
        "- T4 (smart col + smart debt): supply all three.",
        "",
        "Returns `(actual_debt, token0_debt, token1_debt, actual_col, token0_col, token1_col)`.",
      ];
      discriminator: [26, 113, 116, 50, 247, 131, 208, 5];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerTokenAccount";
          docs: ["@dev not required for T3/T4 (smart debt pays at DEX)"];
          writable: true;
          optional: true;
        },
        {
          name: "to";
          docs: [
            "",
            "NOTE (Solana vs EVM): non-smart-leg collateral goes to `to_token_account`.",
            "Smart-col collateral seized via the DEX CPI also follows `to` (EVM `to_`",
            "parity) — but only when the supply leg's `dex_recipient_token0/1_account`",
            "are supplied; without them the DEX credits the liquidator *signer*'s",
            "pool token accounts. Smart-debt paybacks always pull from the signer.",
          ];
        },
        {
          name: "toTokenAccount";
          docs: ["@dev not required for T2/T4 (smart col withdraws at DEX)"];
          writable: true;
          optional: true;
        },
        {
          name: "vaultConfig";
          docs: [
            "@dev mut because this PDA signs CPIs to the DEX and liquidity programs",
          ];
          writable: true;
        },
        {
          name: "vaultState";
          writable: true;
        },
        {
          name: "supplyToken";
          docs: ["@dev not required for T2/T4"];
          optional: true;
        },
        {
          name: "borrowToken";
          docs: ["@dev not required for T3/T4"];
          optional: true;
        },
        {
          name: "oracle";
        },
        {
          name: "newBranch";
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev not required for T2/T4"];
          writable: true;
          optional: true;
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev not required for T3/T4"];
          writable: true;
          optional: true;
        },
        {
          name: "vaultSupplyPositionOnLiquidity";
          docs: ["@dev not required for T2/T4"];
          writable: true;
          optional: true;
        },
        {
          name: "vaultBorrowPositionOnLiquidity";
          docs: ["@dev not required for T3/T4"];
          writable: true;
          optional: true;
        },
        {
          name: "supplyRateModel";
          optional: true;
        },
        {
          name: "borrowRateModel";
          optional: true;
        },
        {
          name: "supplyTokenClaimAccount";
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
          name: "vaultSupplyTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "vaultBorrowTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "supplyTokenProgram";
          optional: true;
        },
        {
          name: "borrowTokenProgram";
          optional: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "oracleProgram";
        },
        {
          name: "supplyDex";
          accounts: [
            {
              name: "dex";
              writable: true;
              optional: true;
            },
            {
              name: "dexPosition";
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken0Account";
              docs: ["Signer's token0 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken1Account";
              docs: ["Signer's token1 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0";
              optional: true;
            },
            {
              name: "dexToken1";
              optional: true;
            },
            {
              name: "dexToken0Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0RateModel";
              optional: true;
            },
            {
              name: "dexToken1RateModel";
              optional: true;
            },
            {
              name: "dexToken0Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token0",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token1",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken0";
              docs: [
                "This pool's own LL **supply** position for token0 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken1";
              docs: [
                "This pool's own LL **supply** position for token1 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken0";
              docs: [
                "This pool's own LL **borrow** position for token0 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken1";
              docs: [
                "This pool's own LL **borrow** position for token1 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0Program";
              optional: true;
            },
            {
              name: "dexToken1Program";
              optional: true;
            },
            {
              name: "dexRecipientToken0Account";
              docs: [
                "Recipient's token0 account for this leg's withdraw/borrow OUTPUTS.",
                "Optional: outputs default to the signer's `dex_user_token0_account`.",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexRecipientToken1Account";
              docs: [
                "Recipient's token1 account for this leg's withdraw/borrow OUTPUTS.",
              ];
              writable: true;
              optional: true;
            },
          ];
        },
        {
          name: "borrowDex";
          accounts: [
            {
              name: "dex";
              writable: true;
              optional: true;
            },
            {
              name: "dexPosition";
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken0Account";
              docs: ["Signer's token0 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken1Account";
              docs: ["Signer's token1 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0";
              optional: true;
            },
            {
              name: "dexToken1";
              optional: true;
            },
            {
              name: "dexToken0Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0RateModel";
              optional: true;
            },
            {
              name: "dexToken1RateModel";
              optional: true;
            },
            {
              name: "dexToken0Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token0",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token1",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken0";
              docs: [
                "This pool's own LL **supply** position for token0 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken1";
              docs: [
                "This pool's own LL **supply** position for token1 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken0";
              docs: [
                "This pool's own LL **borrow** position for token0 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken1";
              docs: [
                "This pool's own LL **borrow** position for token1 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0Program";
              optional: true;
            },
            {
              name: "dexToken1Program";
              optional: true;
            },
            {
              name: "dexRecipientToken0Account";
              docs: [
                "Recipient's token0 account for this leg's withdraw/borrow OUTPUTS.",
                "Optional: outputs default to the signer's `dex_user_token0_account`.",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexRecipientToken1Account";
              docs: [
                "Recipient's token1 account for this leg's withdraw/borrow OUTPUTS.",
              ];
              writable: true;
              optional: true;
            },
          ];
        },
        {
          name: "dexProgram";
        },
        {
          name: "dexOracleProgram";
          optional: true;
        },
      ];
      args: [
        {
          name: "debtAmt";
          type: "u64";
        },
        {
          name: "debtPerfectAmounts";
          type: {
            option: {
              defined: {
                name: "liquidatePerfectDexDebtAmounts";
              };
            };
          };
        },
        {
          name: "colPerUnitDebt";
          type: "u128";
        },
        {
          name: "colAmounts";
          type: {
            option: {
              defined: {
                name: "liquidateDexColAmounts";
              };
            };
          };
        },
        {
          name: "absorb";
          type: "bool";
        },
        {
          name: "transferType";
          type: {
            option: {
              defined: {
                name: "transferType";
              };
            };
          };
        },
        {
          name: "remainingAccountsIndices";
          type: "bytes";
        },
      ];
    },
    {
      name: "operate";
      discriminator: [217, 106, 208, 99, 116, 151, 42, 135];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerSupplyTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "signerBorrowTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientBorrowTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "recipientSupplyTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "vaultConfig";
          docs: [
            "@dev mut because this PDA signs the CPI to liquidity program",
            "@dev verification inside instruction logic",
          ];
        },
        {
          name: "vaultState";
          docs: ["@dev verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyToken";
        },
        {
          name: "borrowToken";
        },
        {
          name: "oracle";
        },
        {
          name: "position";
          writable: true;
        },
        {
          name: "positionTokenAccount";
          docs: ["@dev verification inside instruction logic"];
        },
        {
          name: "currentPositionTick";
          writable: true;
        },
        {
          name: "finalPositionTick";
          writable: true;
        },
        {
          name: "currentPositionTickId";
        },
        {
          name: "finalPositionTickId";
          writable: true;
        },
        {
          name: "newBranch";
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          writable: true;
        },
        {
          name: "borrowTokenReservesLiquidity";
          writable: true;
        },
        {
          name: "vaultSupplyPositionOnLiquidity";
          writable: true;
        },
        {
          name: "vaultBorrowPositionOnLiquidity";
          writable: true;
        },
        {
          name: "supplyRateModel";
        },
        {
          name: "borrowRateModel";
        },
        {
          name: "vaultSupplyTokenAccount";
          writable: true;
        },
        {
          name: "vaultBorrowTokenAccount";
          writable: true;
        },
        {
          name: "supplyTokenClaimAccount";
          writable: true;
          optional: true;
        },
        {
          name: "borrowTokenClaimAccount";
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
          name: "supplyTokenProgram";
        },
        {
          name: "borrowTokenProgram";
        },
        {
          name: "associatedTokenProgram";
          optional: true;
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "newCol";
          type: "i128";
        },
        {
          name: "newDebt";
          type: "i128";
        },
        {
          name: "transferType";
          type: {
            option: {
              defined: {
                name: "transferType";
              };
            };
          };
        },
        {
          name: "remainingAccountsIndices";
          type: "bytes";
        },
      ];
    },
    {
      name: "operateDex";
      discriminator: [223, 122, 223, 181, 133, 132, 116, 33];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerSupplyTokenAccount";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "signerBorrowTokenAccount";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "recipient";
          docs: [
            "",
            "NOTE (Solana vs EVM): normal (Liquidity-layer) leg outputs go to the",
            "recipient's ATAs. Smart DEX leg OUTPUTS also follow `recipient` (EVM",
            "`to_` parity) — but only when the leg's `dex_recipient_token0/1_account`",
            "are supplied on the corresponding `DexAccount` group; without them the",
            "DEX defaults smart-leg outputs to the *signer*'s pool token accounts.",
            "Smart-leg INPUTS (deposit/payback pulls) always come from the signer.",
          ];
          optional: true;
        },
        {
          name: "recipientBorrowTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "recipientSupplyTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "vaultConfig";
          docs: [
            "@dev mut because this PDA signs CPIs to the DEX and liquidity programs",
          ];
          writable: true;
        },
        {
          name: "vaultState";
          writable: true;
        },
        {
          name: "supplyToken";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          optional: true;
        },
        {
          name: "borrowToken";
          docs: [
            "@dev possible that this account is not required for vault like T3, T4",
          ];
          optional: true;
        },
        {
          name: "oracle";
        },
        {
          name: "position";
          writable: true;
        },
        {
          name: "positionTokenAccount";
        },
        {
          name: "currentPositionTick";
          writable: true;
        },
        {
          name: "finalPositionTick";
          writable: true;
        },
        {
          name: "currentPositionTickId";
        },
        {
          name: "finalPositionTickId";
          writable: true;
        },
        {
          name: "newBranch";
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: [
            "@dev possible that this account is not required for vault like T3, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "vaultSupplyPositionOnLiquidity";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "vaultBorrowPositionOnLiquidity";
          docs: [
            "@dev possible that this account is not required for vault like T3, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "supplyRateModel";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          optional: true;
        },
        {
          name: "borrowRateModel";
          docs: [
            "@dev possible that this account is not required for vault like T3, T4",
          ];
          optional: true;
        },
        {
          name: "vaultSupplyTokenAccount";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "vaultBorrowTokenAccount";
          docs: [
            "@dev possible that this account is not required for vault like T3, T4",
          ];
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
          name: "supplyTokenProgram";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          optional: true;
        },
        {
          name: "borrowTokenProgram";
          docs: [
            "@dev possible that this account is not required for vault like T3, T4",
          ];
          optional: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "supplyDex";
          accounts: [
            {
              name: "dex";
              writable: true;
              optional: true;
            },
            {
              name: "dexPosition";
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken0Account";
              docs: ["Signer's token0 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken1Account";
              docs: ["Signer's token1 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0";
              optional: true;
            },
            {
              name: "dexToken1";
              optional: true;
            },
            {
              name: "dexToken0Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0RateModel";
              optional: true;
            },
            {
              name: "dexToken1RateModel";
              optional: true;
            },
            {
              name: "dexToken0Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token0",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token1",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken0";
              docs: [
                "This pool's own LL **supply** position for token0 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken1";
              docs: [
                "This pool's own LL **supply** position for token1 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken0";
              docs: [
                "This pool's own LL **borrow** position for token0 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken1";
              docs: [
                "This pool's own LL **borrow** position for token1 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0Program";
              optional: true;
            },
            {
              name: "dexToken1Program";
              optional: true;
            },
            {
              name: "dexRecipientToken0Account";
              docs: [
                "Recipient's token0 account for this leg's withdraw/borrow OUTPUTS.",
                "Optional: outputs default to the signer's `dex_user_token0_account`.",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexRecipientToken1Account";
              docs: [
                "Recipient's token1 account for this leg's withdraw/borrow OUTPUTS.",
              ];
              writable: true;
              optional: true;
            },
          ];
        },
        {
          name: "borrowDex";
          accounts: [
            {
              name: "dex";
              writable: true;
              optional: true;
            },
            {
              name: "dexPosition";
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken0Account";
              docs: ["Signer's token0 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken1Account";
              docs: ["Signer's token1 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0";
              optional: true;
            },
            {
              name: "dexToken1";
              optional: true;
            },
            {
              name: "dexToken0Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0RateModel";
              optional: true;
            },
            {
              name: "dexToken1RateModel";
              optional: true;
            },
            {
              name: "dexToken0Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token0",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token1",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken0";
              docs: [
                "This pool's own LL **supply** position for token0 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken1";
              docs: [
                "This pool's own LL **supply** position for token1 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken0";
              docs: [
                "This pool's own LL **borrow** position for token0 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken1";
              docs: [
                "This pool's own LL **borrow** position for token1 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0Program";
              optional: true;
            },
            {
              name: "dexToken1Program";
              optional: true;
            },
            {
              name: "dexRecipientToken0Account";
              docs: [
                "Recipient's token0 account for this leg's withdraw/borrow OUTPUTS.",
                "Optional: outputs default to the signer's `dex_user_token0_account`.",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexRecipientToken1Account";
              docs: [
                "Recipient's token1 account for this leg's withdraw/borrow OUTPUTS.",
              ];
              writable: true;
              optional: true;
            },
          ];
        },
        {
          name: "dexProgram";
          docs: ["@audit verify dex program in instruction logic"];
        },
      ];
      args: [
        {
          name: "colAmounts";
          type: {
            option: {
              defined: {
                name: "operateDexColAmounts";
              };
            };
          };
        },
        {
          name: "debtAmounts";
          type: {
            option: {
              defined: {
                name: "operateDexDebtAmounts";
              };
            };
          };
        },
        {
          name: "transferType";
          type: {
            option: {
              defined: {
                name: "transferType";
              };
            };
          };
        },
        {
          name: "remainingAccountsIndices";
          type: "bytes";
        },
      ];
    },
    {
      name: "operatePerfectDex";
      discriminator: [88, 34, 180, 77, 152, 186, 166, 162];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "signerSupplyTokenAccount";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "signerBorrowTokenAccount";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "recipient";
          docs: [
            "",
            "NOTE (Solana vs EVM): normal (Liquidity-layer) leg outputs go to the",
            "recipient's ATAs. Smart DEX leg OUTPUTS also follow `recipient` (EVM",
            "`to_` parity) — but only when the leg's `dex_recipient_token0/1_account`",
            "are supplied on the corresponding `DexAccount` group; without them the",
            "DEX defaults smart-leg outputs to the *signer*'s pool token accounts.",
            "Smart-leg INPUTS (deposit/payback pulls) always come from the signer.",
          ];
          optional: true;
        },
        {
          name: "recipientBorrowTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "recipientSupplyTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "vaultConfig";
          docs: [
            "@dev mut because this PDA signs CPIs to the DEX and liquidity programs",
          ];
          writable: true;
        },
        {
          name: "vaultState";
          writable: true;
        },
        {
          name: "supplyToken";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          optional: true;
        },
        {
          name: "borrowToken";
          docs: [
            "@dev possible that this account is not required for vault like T3, T4",
          ];
          optional: true;
        },
        {
          name: "oracle";
        },
        {
          name: "position";
          writable: true;
        },
        {
          name: "positionTokenAccount";
        },
        {
          name: "currentPositionTick";
          writable: true;
        },
        {
          name: "finalPositionTick";
          writable: true;
        },
        {
          name: "currentPositionTickId";
        },
        {
          name: "finalPositionTickId";
          writable: true;
        },
        {
          name: "newBranch";
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: [
            "@dev possible that this account is not required for vault like T3, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "vaultSupplyPositionOnLiquidity";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "vaultBorrowPositionOnLiquidity";
          docs: [
            "@dev possible that this account is not required for vault like T3, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "supplyRateModel";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          optional: true;
        },
        {
          name: "borrowRateModel";
          docs: [
            "@dev possible that this account is not required for vault like T3, T4",
          ];
          optional: true;
        },
        {
          name: "vaultSupplyTokenAccount";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          writable: true;
          optional: true;
        },
        {
          name: "vaultBorrowTokenAccount";
          docs: [
            "@dev possible that this account is not required for vault like T3, T4",
          ];
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
          name: "supplyTokenProgram";
          docs: [
            "@dev possible that this account is not required for vault like T2, T4",
          ];
          optional: true;
        },
        {
          name: "borrowTokenProgram";
          docs: [
            "@dev possible that this account is not required for vault like T3, T4",
          ];
          optional: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "supplyDex";
          accounts: [
            {
              name: "dex";
              writable: true;
              optional: true;
            },
            {
              name: "dexPosition";
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken0Account";
              docs: ["Signer's token0 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken1Account";
              docs: ["Signer's token1 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0";
              optional: true;
            },
            {
              name: "dexToken1";
              optional: true;
            },
            {
              name: "dexToken0Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0RateModel";
              optional: true;
            },
            {
              name: "dexToken1RateModel";
              optional: true;
            },
            {
              name: "dexToken0Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token0",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token1",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken0";
              docs: [
                "This pool's own LL **supply** position for token0 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken1";
              docs: [
                "This pool's own LL **supply** position for token1 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken0";
              docs: [
                "This pool's own LL **borrow** position for token0 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken1";
              docs: [
                "This pool's own LL **borrow** position for token1 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0Program";
              optional: true;
            },
            {
              name: "dexToken1Program";
              optional: true;
            },
            {
              name: "dexRecipientToken0Account";
              docs: [
                "Recipient's token0 account for this leg's withdraw/borrow OUTPUTS.",
                "Optional: outputs default to the signer's `dex_user_token0_account`.",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexRecipientToken1Account";
              docs: [
                "Recipient's token1 account for this leg's withdraw/borrow OUTPUTS.",
              ];
              writable: true;
              optional: true;
            },
          ];
        },
        {
          name: "borrowDex";
          accounts: [
            {
              name: "dex";
              writable: true;
              optional: true;
            },
            {
              name: "dexPosition";
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken0Account";
              docs: ["Signer's token0 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken1Account";
              docs: ["Signer's token1 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0";
              optional: true;
            },
            {
              name: "dexToken1";
              optional: true;
            },
            {
              name: "dexToken0Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0RateModel";
              optional: true;
            },
            {
              name: "dexToken1RateModel";
              optional: true;
            },
            {
              name: "dexToken0Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token0",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token1",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken0";
              docs: [
                "This pool's own LL **supply** position for token0 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken1";
              docs: [
                "This pool's own LL **supply** position for token1 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken0";
              docs: [
                "This pool's own LL **borrow** position for token0 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken1";
              docs: [
                "This pool's own LL **borrow** position for token1 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0Program";
              optional: true;
            },
            {
              name: "dexToken1Program";
              optional: true;
            },
            {
              name: "dexRecipientToken0Account";
              docs: [
                "Recipient's token0 account for this leg's withdraw/borrow OUTPUTS.",
                "Optional: outputs default to the signer's `dex_user_token0_account`.",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexRecipientToken1Account";
              docs: [
                "Recipient's token1 account for this leg's withdraw/borrow OUTPUTS.",
              ];
              writable: true;
              optional: true;
            },
          ];
        },
        {
          name: "dexProgram";
          docs: ["@audit verify dex program in instruction logic"];
        },
      ];
      args: [
        {
          name: "colAmounts";
          type: {
            option: {
              defined: {
                name: "operatePerfectDexColAmounts";
              };
            };
          };
        },
        {
          name: "debtAmounts";
          type: {
            option: {
              defined: {
                name: "operatePerfectDexDebtAmounts";
              };
            };
          };
        },
        {
          name: "transferType";
          type: {
            option: {
              defined: {
                name: "transferType";
              };
            };
          };
        },
        {
          name: "remainingAccountsIndices";
          type: "bytes";
        },
      ];
    },
    {
      name: "rebalance";
      discriminator: [108, 158, 77, 9, 210, 52, 88, 62];
      accounts: [
        {
          name: "rebalancer";
          writable: true;
          signer: true;
          relations: ["vaultConfig"];
        },
        {
          name: "rebalancerSupplyTokenAccount";
          writable: true;
        },
        {
          name: "rebalancerBorrowTokenAccount";
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: [
            "@dev mut because this PDA signs the CPI to liquidity program",
            "@dev verification inside instruction logic",
          ];
          writable: true;
        },
        {
          name: "vaultState";
          docs: ["@dev verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyToken";
          relations: ["vaultConfig"];
        },
        {
          name: "borrowToken";
          relations: ["vaultConfig"];
        },
        {
          name: "supplyTokenReservesLiquidity";
          writable: true;
        },
        {
          name: "borrowTokenReservesLiquidity";
          writable: true;
        },
        {
          name: "vaultSupplyPositionOnLiquidity";
          writable: true;
        },
        {
          name: "vaultBorrowPositionOnLiquidity";
          writable: true;
        },
        {
          name: "supplyRateModel";
        },
        {
          name: "borrowRateModel";
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "vaultSupplyTokenAccount";
          writable: true;
        },
        {
          name: "vaultBorrowTokenAccount";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "supplyTokenProgram";
        },
        {
          name: "borrowTokenProgram";
        },
        {
          name: "associatedTokenProgram";
          optional: true;
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
      ];
      args: [];
    },
    {
      name: "rebalanceDex";
      discriminator: [71, 178, 19, 146, 254, 47, 109, 126];
      accounts: [
        {
          name: "rebalancer";
          writable: true;
          signer: true;
          relations: ["vaultConfig"];
        },
        {
          name: "rebalancerSupplyTokenAccount";
          docs: ["@dev not required for T2/T4 (smart collateral)"];
          writable: true;
          optional: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "rebalancer";
              },
              {
                kind: "account";
                path: "supplyTokenProgram";
              },
              {
                kind: "account";
                path: "supplyToken";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "rebalancerBorrowTokenAccount";
          docs: ["@dev not required for T3/T4 (smart debt)"];
          writable: true;
          optional: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "rebalancer";
              },
              {
                kind: "account";
                path: "borrowTokenProgram";
              },
              {
                kind: "account";
                path: "borrowToken";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "vaultConfig";
          writable: true;
        },
        {
          name: "vaultState";
          writable: true;
        },
        {
          name: "supplyToken";
          docs: ["@dev not required for T2/T4 (smart collateral)"];
          optional: true;
        },
        {
          name: "borrowToken";
          docs: ["@dev not required for T3/T4 (smart debt)"];
          optional: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev not required for T2/T4 (smart collateral)"];
          writable: true;
          optional: true;
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev not required for T3/T4 (smart debt)"];
          writable: true;
          optional: true;
        },
        {
          name: "vaultSupplyPositionOnLiquidity";
          docs: ["@dev not required for T2/T4 (smart collateral)"];
          writable: true;
          optional: true;
        },
        {
          name: "vaultBorrowPositionOnLiquidity";
          docs: ["@dev not required for T3/T4 (smart debt)"];
          writable: true;
          optional: true;
        },
        {
          name: "supplyRateModel";
          optional: true;
        },
        {
          name: "borrowRateModel";
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "vaultSupplyTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "vaultBorrowTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "supplyTokenProgram";
          optional: true;
        },
        {
          name: "borrowTokenProgram";
          optional: true;
        },
        {
          name: "associatedTokenProgram";
          optional: true;
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "dexProgram";
        },
        {
          name: "dexOracleProgram";
          optional: true;
        },
        {
          name: "supplyDex";
          accounts: [
            {
              name: "dex";
              writable: true;
              optional: true;
            },
            {
              name: "dexPosition";
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken0Account";
              docs: ["Signer's token0 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken1Account";
              docs: ["Signer's token1 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0";
              optional: true;
            },
            {
              name: "dexToken1";
              optional: true;
            },
            {
              name: "dexToken0Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0RateModel";
              optional: true;
            },
            {
              name: "dexToken1RateModel";
              optional: true;
            },
            {
              name: "dexToken0Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token0",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token1",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken0";
              docs: [
                "This pool's own LL **supply** position for token0 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken1";
              docs: [
                "This pool's own LL **supply** position for token1 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken0";
              docs: [
                "This pool's own LL **borrow** position for token0 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken1";
              docs: [
                "This pool's own LL **borrow** position for token1 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0Program";
              optional: true;
            },
            {
              name: "dexToken1Program";
              optional: true;
            },
            {
              name: "dexRecipientToken0Account";
              docs: [
                "Recipient's token0 account for this leg's withdraw/borrow OUTPUTS.",
                "Optional: outputs default to the signer's `dex_user_token0_account`.",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexRecipientToken1Account";
              docs: [
                "Recipient's token1 account for this leg's withdraw/borrow OUTPUTS.",
              ];
              writable: true;
              optional: true;
            },
          ];
        },
        {
          name: "borrowDex";
          accounts: [
            {
              name: "dex";
              writable: true;
              optional: true;
            },
            {
              name: "dexPosition";
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken0Account";
              docs: ["Signer's token0 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken1Account";
              docs: ["Signer's token1 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0";
              optional: true;
            },
            {
              name: "dexToken1";
              optional: true;
            },
            {
              name: "dexToken0Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0RateModel";
              optional: true;
            },
            {
              name: "dexToken1RateModel";
              optional: true;
            },
            {
              name: "dexToken0Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token0",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token1",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken0";
              docs: [
                "This pool's own LL **supply** position for token0 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken1";
              docs: [
                "This pool's own LL **supply** position for token1 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken0";
              docs: [
                "This pool's own LL **borrow** position for token0 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken1";
              docs: [
                "This pool's own LL **borrow** position for token1 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0Program";
              optional: true;
            },
            {
              name: "dexToken1Program";
              optional: true;
            },
            {
              name: "dexRecipientToken0Account";
              docs: [
                "Recipient's token0 account for this leg's withdraw/borrow OUTPUTS.",
                "Optional: outputs default to the signer's `dex_user_token0_account`.",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexRecipientToken1Account";
              docs: [
                "Recipient's token1 account for this leg's withdraw/borrow OUTPUTS.",
              ];
              writable: true;
              optional: true;
            },
          ];
        },
      ];
      args: [
        {
          name: "colToken0MinMax";
          type: "i128";
        },
        {
          name: "colToken1MinMax";
          type: "i128";
        },
        {
          name: "debtToken0MinMax";
          type: "i128";
        },
        {
          name: "debtToken1MinMax";
          type: "i128";
        },
      ];
    },
    {
      name: "rebalanceDexWithAmounts";
      docs: [
        "Rebalance a typed (T2-T4 / DEX) vault by a custom (capped) amount per leg.",
        "`supply_amount`/`borrow_amount` are unsigned magnitudes; `None` rebalances",
        "the full imbalance for that leg, `Some(n)` clamps it to `n`. Direction is",
        "driven by the imbalance sign; the `*_min_max` slippage bounds behave as in",
        "[`Self::rebalance_dex`].",
      ];
      discriminator: [240, 127, 38, 166, 99, 125, 51, 124];
      accounts: [
        {
          name: "rebalancer";
          writable: true;
          signer: true;
          relations: ["vaultConfig"];
        },
        {
          name: "rebalancerSupplyTokenAccount";
          docs: ["@dev not required for T2/T4 (smart collateral)"];
          writable: true;
          optional: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "rebalancer";
              },
              {
                kind: "account";
                path: "supplyTokenProgram";
              },
              {
                kind: "account";
                path: "supplyToken";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "rebalancerBorrowTokenAccount";
          docs: ["@dev not required for T3/T4 (smart debt)"];
          writable: true;
          optional: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "rebalancer";
              },
              {
                kind: "account";
                path: "borrowTokenProgram";
              },
              {
                kind: "account";
                path: "borrowToken";
              },
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ];
            };
          };
        },
        {
          name: "vaultConfig";
          writable: true;
        },
        {
          name: "vaultState";
          writable: true;
        },
        {
          name: "supplyToken";
          docs: ["@dev not required for T2/T4 (smart collateral)"];
          optional: true;
        },
        {
          name: "borrowToken";
          docs: ["@dev not required for T3/T4 (smart debt)"];
          optional: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev not required for T2/T4 (smart collateral)"];
          writable: true;
          optional: true;
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev not required for T3/T4 (smart debt)"];
          writable: true;
          optional: true;
        },
        {
          name: "vaultSupplyPositionOnLiquidity";
          docs: ["@dev not required for T2/T4 (smart collateral)"];
          writable: true;
          optional: true;
        },
        {
          name: "vaultBorrowPositionOnLiquidity";
          docs: ["@dev not required for T3/T4 (smart debt)"];
          writable: true;
          optional: true;
        },
        {
          name: "supplyRateModel";
          optional: true;
        },
        {
          name: "borrowRateModel";
          optional: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "vaultSupplyTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "vaultBorrowTokenAccount";
          writable: true;
          optional: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "supplyTokenProgram";
          optional: true;
        },
        {
          name: "borrowTokenProgram";
          optional: true;
        },
        {
          name: "associatedTokenProgram";
          optional: true;
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "dexProgram";
        },
        {
          name: "dexOracleProgram";
          optional: true;
        },
        {
          name: "supplyDex";
          accounts: [
            {
              name: "dex";
              writable: true;
              optional: true;
            },
            {
              name: "dexPosition";
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken0Account";
              docs: ["Signer's token0 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken1Account";
              docs: ["Signer's token1 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0";
              optional: true;
            },
            {
              name: "dexToken1";
              optional: true;
            },
            {
              name: "dexToken0Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0RateModel";
              optional: true;
            },
            {
              name: "dexToken1RateModel";
              optional: true;
            },
            {
              name: "dexToken0Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token0",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token1",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken0";
              docs: [
                "This pool's own LL **supply** position for token0 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken1";
              docs: [
                "This pool's own LL **supply** position for token1 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken0";
              docs: [
                "This pool's own LL **borrow** position for token0 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken1";
              docs: [
                "This pool's own LL **borrow** position for token1 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0Program";
              optional: true;
            },
            {
              name: "dexToken1Program";
              optional: true;
            },
            {
              name: "dexRecipientToken0Account";
              docs: [
                "Recipient's token0 account for this leg's withdraw/borrow OUTPUTS.",
                "Optional: outputs default to the signer's `dex_user_token0_account`.",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexRecipientToken1Account";
              docs: [
                "Recipient's token1 account for this leg's withdraw/borrow OUTPUTS.",
              ];
              writable: true;
              optional: true;
            },
          ];
        },
        {
          name: "borrowDex";
          accounts: [
            {
              name: "dex";
              writable: true;
              optional: true;
            },
            {
              name: "dexPosition";
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken0Account";
              docs: ["Signer's token0 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexUserToken1Account";
              docs: ["Signer's token1 account"];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0";
              optional: true;
            },
            {
              name: "dexToken1";
              optional: true;
            },
            {
              name: "dexToken0Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Reserve";
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0RateModel";
              optional: true;
            },
            {
              name: "dexToken1RateModel";
              optional: true;
            },
            {
              name: "dexToken0Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token0",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken1Vault";
              docs: [
                "@dev this is Liquidity layer vault token account for token1",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken0";
              docs: [
                "This pool's own LL **supply** position for token0 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "supplyPosToken1";
              docs: [
                "This pool's own LL **supply** position for token1 (smart-col side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken0";
              docs: [
                "This pool's own LL **borrow** position for token0 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "borrowPosToken1";
              docs: [
                "This pool's own LL **borrow** position for token1 (smart-debt side).",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexToken0Program";
              optional: true;
            },
            {
              name: "dexToken1Program";
              optional: true;
            },
            {
              name: "dexRecipientToken0Account";
              docs: [
                "Recipient's token0 account for this leg's withdraw/borrow OUTPUTS.",
                "Optional: outputs default to the signer's `dex_user_token0_account`.",
              ];
              writable: true;
              optional: true;
            },
            {
              name: "dexRecipientToken1Account";
              docs: [
                "Recipient's token1 account for this leg's withdraw/borrow OUTPUTS.",
              ];
              writable: true;
              optional: true;
            },
          ];
        },
      ];
      args: [
        {
          name: "supplyAmount";
          type: {
            option: "u128";
          };
        },
        {
          name: "borrowAmount";
          type: {
            option: "u128";
          };
        },
        {
          name: "colToken0MinMax";
          type: "i128";
        },
        {
          name: "colToken1MinMax";
          type: "i128";
        },
        {
          name: "debtToken0MinMax";
          type: "i128";
        },
        {
          name: "debtToken1MinMax";
          type: "i128";
        },
      ];
    },
    {
      name: "rebalanceWithAmounts";
      docs: [
        "Rebalance a T1 vault by a custom (capped) amount per leg.",
        "`supply_amount`/`borrow_amount` are unsigned magnitudes; `None` rebalances",
        "the full imbalance for that leg, `Some(n)` clamps it to `n`. Direction",
        "(deposit vs withdraw / borrow vs payback) is driven by the imbalance sign.",
      ];
      discriminator: [190, 33, 144, 182, 86, 4, 141, 73];
      accounts: [
        {
          name: "rebalancer";
          writable: true;
          signer: true;
          relations: ["vaultConfig"];
        },
        {
          name: "rebalancerSupplyTokenAccount";
          writable: true;
        },
        {
          name: "rebalancerBorrowTokenAccount";
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: [
            "@dev mut because this PDA signs the CPI to liquidity program",
            "@dev verification inside instruction logic",
          ];
          writable: true;
        },
        {
          name: "vaultState";
          docs: ["@dev verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyToken";
          relations: ["vaultConfig"];
        },
        {
          name: "borrowToken";
          relations: ["vaultConfig"];
        },
        {
          name: "supplyTokenReservesLiquidity";
          writable: true;
        },
        {
          name: "borrowTokenReservesLiquidity";
          writable: true;
        },
        {
          name: "vaultSupplyPositionOnLiquidity";
          writable: true;
        },
        {
          name: "vaultBorrowPositionOnLiquidity";
          writable: true;
        },
        {
          name: "supplyRateModel";
        },
        {
          name: "borrowRateModel";
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
        },
        {
          name: "vaultSupplyTokenAccount";
          writable: true;
        },
        {
          name: "vaultBorrowTokenAccount";
          writable: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "supplyTokenProgram";
        },
        {
          name: "borrowTokenProgram";
        },
        {
          name: "associatedTokenProgram";
          optional: true;
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
      ];
      args: [
        {
          name: "supplyAmount";
          type: {
            option: "u128";
          };
        },
        {
          name: "borrowAmount";
          type: {
            option: "u128";
          };
        },
      ];
    },
    {
      name: "updateAuthority";
      discriminator: [32, 46, 64, 28, 149, 75, 243, 88];
      accounts: [
        {
          name: "signer";
          signer: true;
        },
        {
          name: "vaultAdmin";
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
          name: "signer";
          signer: true;
        },
        {
          name: "vaultAdmin";
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
      name: "updateBorrowFee";
      discriminator: [251, 124, 35, 148, 202, 167, 157, 65];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "borrowFee";
          type: "u8";
        },
      ];
    },
    {
      name: "updateBorrowRateMagnifier";
      discriminator: [75, 250, 27, 176, 156, 53, 26, 112];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "borrowRateMagnifier";
          type: "i16";
        },
      ];
    },
    {
      name: "updateCollateralFactor";
      discriminator: [244, 83, 227, 215, 220, 82, 201, 221];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "collateralFactor";
          type: "u16";
        },
      ];
    },
    {
      name: "updateCoreSettings";
      discriminator: [101, 84, 9, 11, 60, 104, 149, 234];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "params";
          type: {
            defined: {
              name: "updateCoreSettingsParams";
            };
          };
        },
      ];
    },
    {
      name: "updateExchangePrices";
      discriminator: [209, 14, 188, 95, 242, 20, 119, 196];
      accounts: [
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
      ];
    },
    {
      name: "updateLiquidationMaxLimit";
      discriminator: [183, 242, 152, 150, 176, 40, 65, 161];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "liquidationMaxLimit";
          type: "u16";
        },
      ];
    },
    {
      name: "updateLiquidationPenalty";
      discriminator: [21, 168, 167, 206, 98, 206, 69, 32];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "liquidationPenalty";
          type: "u16";
        },
      ];
    },
    {
      name: "updateLiquidationThreshold";
      discriminator: [53, 185, 87, 243, 138, 11, 79, 28];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "liquidationThreshold";
          type: "u16";
        },
      ];
    },
    {
      name: "updateLookupTable";
      discriminator: [221, 59, 30, 246, 106, 223, 137, 55];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultMetadata";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "lookupTable";
          type: "pubkey";
        },
      ];
    },
    {
      name: "updateOracle";
      discriminator: [112, 41, 209, 18, 248, 226, 252, 188];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "newOracle";
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
      ];
    },
    {
      name: "updateRebalancer";
      discriminator: [206, 187, 54, 228, 145, 8, 203, 111];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "newRebalancer";
          type: "pubkey";
        },
      ];
    },
    {
      name: "updateSupplyRateMagnifier";
      discriminator: [175, 59, 117, 196, 211, 170, 22, 12];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "supplyRateMagnifier";
          type: "i16";
        },
      ];
    },
    {
      name: "updateWithdrawGap";
      discriminator: [229, 163, 76, 21, 82, 215, 25, 233];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "vaultAdmin";
        },
        {
          name: "vaultState";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "withdrawGap";
          type: "u16";
        },
      ];
    },
  ];
  accounts: [
    {
      name: "branch";
      discriminator: [14, 63, 100, 50, 25, 8, 29, 5];
    },
    {
      name: "dex";
      discriminator: [236, 30, 181, 80, 209, 217, 25, 163];
    },
    {
      name: "dexPosition";
      discriminator: [30, 36, 219, 78, 189, 173, 170, 47];
    },
    {
      name: "oracle";
      discriminator: [139, 194, 131, 179, 140, 179, 229, 244];
    },
    {
      name: "position";
      discriminator: [170, 188, 143, 228, 122, 64, 247, 208];
    },
    {
      name: "tick";
      discriminator: [176, 94, 67, 247, 133, 173, 7, 115];
    },
    {
      name: "tickHasDebtArray";
      discriminator: [91, 232, 60, 29, 124, 103, 49, 252];
    },
    {
      name: "tickIdLiquidation";
      discriminator: [41, 28, 190, 197, 68, 213, 31, 181];
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
    {
      name: "vaultAdmin";
      discriminator: [88, 97, 160, 117, 102, 39, 103, 44];
    },
    {
      name: "vaultConfig";
      discriminator: [99, 86, 43, 216, 184, 102, 119, 77];
    },
    {
      name: "vaultMetadata";
      discriminator: [248, 177, 244, 93, 67, 19, 117, 57];
    },
    {
      name: "vaultState";
      discriminator: [228, 196, 82, 165, 98, 210, 235, 152];
    },
  ];
  events: [
    {
      name: "logAbsorb";
      discriminator: [177, 119, 143, 137, 184, 63, 197, 215];
    },
    {
      name: "logClosePosition";
      discriminator: [225, 156, 13, 36, 189, 95, 170, 92];
    },
    {
      name: "logInitBranch";
      discriminator: [127, 182, 211, 219, 140, 189, 193, 101];
    },
    {
      name: "logInitTick";
      discriminator: [56, 182, 35, 79, 249, 114, 9, 175];
    },
    {
      name: "logInitTickHasDebtArray";
      discriminator: [15, 134, 113, 2, 251, 206, 30, 129];
    },
    {
      name: "logInitTickIdLiquidation";
      discriminator: [172, 64, 170, 238, 39, 153, 185, 225];
    },
    {
      name: "logInitVaultConfig";
      discriminator: [194, 158, 35, 55, 179, 48, 174, 46];
    },
    {
      name: "logInitVaultState";
      discriminator: [140, 108, 65, 38, 128, 26, 194, 28];
    },
    {
      name: "logLiquidate";
      discriminator: [154, 128, 202, 147, 65, 233, 195, 73];
    },
    {
      name: "logLiquidateInfo";
      discriminator: [169, 150, 46, 42, 178, 89, 98, 83];
    },
    {
      name: "logLiquidationRoundingDiff";
      discriminator: [35, 189, 179, 90, 218, 51, 104, 128];
    },
    {
      name: "logOperate";
      discriminator: [180, 8, 81, 71, 19, 132, 173, 8];
    },
    {
      name: "logRebalance";
      discriminator: [90, 67, 219, 41, 181, 118, 132, 9];
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
      name: "logUpdateBorrowFee";
      discriminator: [33, 134, 42, 66, 16, 167, 119, 196];
    },
    {
      name: "logUpdateBorrowRateMagnifier";
      discriminator: [186, 23, 46, 117, 57, 111, 107, 51];
    },
    {
      name: "logUpdateCollateralFactor";
      discriminator: [142, 89, 0, 231, 164, 164, 230, 82];
    },
    {
      name: "logUpdateCoreSettings";
      discriminator: [233, 65, 32, 7, 230, 115, 122, 197];
    },
    {
      name: "logUpdateExchangePrices";
      discriminator: [190, 194, 69, 204, 30, 86, 181, 163];
    },
    {
      name: "logUpdateLiquidationMaxLimit";
      discriminator: [73, 32, 49, 0, 234, 86, 150, 94];
    },
    {
      name: "logUpdateLiquidationPenalty";
      discriminator: [42, 132, 67, 48, 209, 133, 77, 83];
    },
    {
      name: "logUpdateLiquidationThreshold";
      discriminator: [211, 71, 215, 239, 159, 238, 71, 219];
    },
    {
      name: "logUpdateLookupTable";
      discriminator: [45, 248, 126, 111, 185, 41, 103, 5];
    },
    {
      name: "logUpdateOracle";
      discriminator: [251, 163, 219, 57, 30, 152, 177, 10];
    },
    {
      name: "logUpdateRebalancer";
      discriminator: [66, 79, 144, 204, 26, 217, 153, 225];
    },
    {
      name: "logUpdateSupplyRateMagnifier";
      discriminator: [198, 113, 184, 213, 239, 18, 253, 56];
    },
    {
      name: "logUpdateWithdrawGap";
      discriminator: [182, 248, 48, 47, 8, 159, 21, 35];
    },
    {
      name: "logUserPosition";
      discriminator: [46, 44, 213, 42, 55, 59, 190, 133];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "vaultNextTickNotFound";
      msg: "vaultNextTickNotFound";
    },
    {
      code: 6001;
      name: "vaultInvalidPositionMint";
      msg: "vaultInvalidPositionMint";
    },
    {
      code: 6002;
      name: "vaultTickIdLiquidationMismatch";
      msg: "vaultTickIdLiquidationMismatch";
    },
    {
      code: 6003;
      name: "vaultInvalidPositionTokenAmount";
      msg: "vaultInvalidPositionTokenAmount";
    },
    {
      code: 6004;
      name: "vaultInvalidRemainingAccountsIndices";
      msg: "vaultInvalidRemainingAccountsIndices";
    },
    {
      code: 6005;
      name: "vaultTickHasDebtVaultIdMismatch";
      msg: "vaultTickHasDebtVaultIdMismatch";
    },
    {
      code: 6006;
      name: "vaultBranchVaultIdMismatch";
      msg: "vaultBranchVaultIdMismatch";
    },
    {
      code: 6007;
      name: "vaultTickVaultIdMismatch";
      msg: "vaultTickVaultIdMismatch";
    },
    {
      code: 6008;
      name: "vaultInvalidDecimals";
      msg: "vaultInvalidDecimals";
    },
    {
      code: 6009;
      name: "vaultInvalidOperateAmount";
      msg: "vaultInvalidOperateAmount";
    },
    {
      code: 6010;
      name: "vaultTickIsEmpty";
      msg: "vaultTickIsEmpty";
    },
    {
      code: 6011;
      name: "vaultPositionAboveCf";
      msg: "vaultPositionAboveCf";
    },
    {
      code: 6012;
      name: "vaultTopTickDoesNotExist";
      msg: "vaultTopTickDoesNotExist";
    },
    {
      code: 6013;
      name: "vaultExcessSlippageLiquidation";
      msg: "vaultExcessSlippageLiquidation";
    },
    {
      code: 6014;
      name: "vaultNotRebalancer";
      msg: "vaultNotRebalancer";
    },
    {
      code: 6015;
      name: "vaultTokenNotInitialized";
      msg: "vaultTokenNotInitialized";
    },
    {
      code: 6016;
      name: "vaultUserCollateralDebtExceed";
      msg: "vaultUserCollateralDebtExceed";
    },
    {
      code: 6017;
      name: "vaultExcessCollateralWithdrawal";
      msg: "vaultExcessCollateralWithdrawal";
    },
    {
      code: 6018;
      name: "vaultExcessDebtPayback";
      msg: "vaultExcessDebtPayback";
    },
    {
      code: 6019;
      name: "vaultWithdrawMoreThanOperateLimit";
      msg: "vaultWithdrawMoreThanOperateLimit";
    },
    {
      code: 6020;
      name: "vaultInvalidLiquidationAmt";
      msg: "vaultInvalidLiquidationAmt";
    },
    {
      code: 6021;
      name: "vaultLiquidationResult";
      msg: "vaultLiquidationResult";
    },
    {
      code: 6022;
      name: "vaultBranchDebtTooLow";
      msg: "vaultBranchDebtTooLow";
    },
    {
      code: 6023;
      name: "vaultTickDebtTooLow";
      msg: "vaultTickDebtTooLow";
    },
    {
      code: 6024;
      name: "vaultLiquidityExchangePriceUnexpected";
      msg: "vaultLiquidityExchangePriceUnexpected";
    },
    {
      code: 6025;
      name: "vaultUserDebtTooLow";
      msg: "vaultUserDebtTooLow";
    },
    {
      code: 6026;
      name: "vaultInvalidPaybackOrDeposit";
      msg: "vaultInvalidPaybackOrDeposit";
    },
    {
      code: 6027;
      name: "vaultInvalidLiquidation";
      msg: "vaultInvalidLiquidation";
    },
    {
      code: 6028;
      name: "vaultNothingToRebalance";
      msg: "vaultNothingToRebalance";
    },
    {
      code: 6029;
      name: "vaultInvalidRebalanceMinMax";
      msg: "vaultInvalidRebalanceMinMax";
    },
    {
      code: 6030;
      name: "vaultLiquidationReverts";
      msg: "vaultLiquidationReverts";
    },
    {
      code: 6031;
      name: "vaultInvalidOraclePrice";
      msg: "vaultInvalidOraclePrice";
    },
    {
      code: 6032;
      name: "vaultBranchNotFound";
      msg: "vaultBranchNotFound";
    },
    {
      code: 6033;
      name: "vaultTickNotFound";
      msg: "vaultTickNotFound";
    },
    {
      code: 6034;
      name: "vaultTickHasDebtNotFound";
      msg: "vaultTickHasDebtNotFound";
    },
    {
      code: 6035;
      name: "vaultTickMismatch";
      msg: "vaultTickMismatch";
    },
    {
      code: 6036;
      name: "vaultInvalidVaultId";
      msg: "vaultInvalidVaultId";
    },
    {
      code: 6037;
      name: "vaultInvalidNextPositionId";
      msg: "vaultInvalidNextPositionId";
    },
    {
      code: 6038;
      name: "vaultInvalidPositionId";
      msg: "vaultInvalidPositionId";
    },
    {
      code: 6039;
      name: "vaultPositionNotEmpty";
      msg: "vaultPositionNotEmpty";
    },
    {
      code: 6040;
      name: "vaultInvalidSupplyMint";
      msg: "vaultInvalidSupplyMint";
    },
    {
      code: 6041;
      name: "vaultInvalidBorrowMint";
      msg: "vaultInvalidBorrowMint";
    },
    {
      code: 6042;
      name: "vaultInvalidOracle";
      msg: "vaultInvalidOracle";
    },
    {
      code: 6043;
      name: "vaultInvalidTick";
      msg: "vaultInvalidTick";
    },
    {
      code: 6044;
      name: "vaultInvalidLiquidityProgram";
      msg: "vaultInvalidLiquidityProgram";
    },
    {
      code: 6045;
      name: "vaultInvalidPositionAuthority";
      msg: "vaultInvalidPositionAuthority";
    },
    {
      code: 6046;
      name: "vaultOracleNotValid";
      msg: "vaultOracleNotValid";
    },
    {
      code: 6047;
      name: "vaultBranchOwnerNotValid";
      msg: "vaultBranchOwnerNotValid";
    },
    {
      code: 6048;
      name: "vaultTickHasDebtOwnerNotValid";
      msg: "vaultTickHasDebtOwnerNotValid";
    },
    {
      code: 6049;
      name: "vaultTickOwnerNotValid";
      msg: "vaultTickDataOwnerNotValid";
    },
    {
      code: 6050;
      name: "vaultLiquidateRemainingAccountsTooShort";
      msg: "vaultLiquidateRemainingAccountsTooShort";
    },
    {
      code: 6051;
      name: "vaultOperateRemainingAccountsTooShort";
      msg: "vaultOperateRemainingAccountsTooShort";
    },
    {
      code: 6052;
      name: "vaultInvalidZerothBranch";
      msg: "vaultInvalidZerothBranch";
    },
    {
      code: 6053;
      name: "vaultCpiToLiquidityFailed";
      msg: "vaultCpiToLiquidityFailed";
    },
    {
      code: 6054;
      name: "vaultCpiToOracleFailed";
      msg: "vaultCpiToOracleFailed";
    },
    {
      code: 6055;
      name: "vaultOnlyAuthority";
      msg: "vaultOnlyAuthority";
    },
    {
      code: 6056;
      name: "vaultNewBranchInvalid";
      msg: "vaultNewBranchInvalid";
    },
    {
      code: 6057;
      name: "vaultTickHasDebtIndexMismatch";
      msg: "vaultTickHasDebtIndexMismatch";
    },
    {
      code: 6058;
      name: "vaultTickHasDebtOutOfRange";
      msg: "vaultTickHasDebtOutOfRange";
    },
    {
      code: 6059;
      name: "vaultUserSupplyPositionRequired";
      msg: "vaultUserSupplyPositionRequired";
    },
    {
      code: 6060;
      name: "vaultClaimAccountRequired";
      msg: "vaultClaimAccountRequired";
    },
    {
      code: 6061;
      name: "vaultRecipientWithdrawAccountRequired";
      msg: "vaultRecipientWithdrawAccountRequired";
    },
    {
      code: 6062;
      name: "vaultRecipientBorrowAccountRequired";
      msg: "vaultRecipientBorrowAccountRequired";
    },
    {
      code: 6063;
      name: "vaultPositionAboveLiquidationThreshold";
      msg: "vaultPositionAboveLiquidationThreshold";
    },
    {
      code: 6064;
      name: "vaultAdminValueAboveLimit";
      msg: "vaultAdminValueAboveLimit";
    },
    {
      code: 6065;
      name: "vaultAdminOnlyAuths";
      msg: "vaultAdminOnlyAuthAccounts";
    },
    {
      code: 6066;
      name: "vaultAdminAddressZeroNotAllowed";
      msg: "vaultAdminAddressZeroNotAllowed";
    },
    {
      code: 6067;
      name: "vaultAdminVaultIdMismatch";
      msg: "vaultAdminVaultIdMismatch";
    },
    {
      code: 6068;
      name: "vaultAdminTotalIdsMismatch";
      msg: "vaultAdminTotalIdsMismatch";
    },
    {
      code: 6069;
      name: "vaultAdminTickMismatch";
      msg: "vaultAdminTickMismatch";
    },
    {
      code: 6070;
      name: "vaultAdminLiquidityProgramMismatch";
      msg: "vaultAdminLiquidityProgramMismatch";
    },
    {
      code: 6071;
      name: "vaultAdminMaxAuthCountReached";
      msg: "vaultAdminMaxAuthCountReached";
    },
    {
      code: 6072;
      name: "vaultAdminInvalidParams";
      msg: "vaultAdminInvalidParams";
    },
    {
      code: 6073;
      name: "vaultAdminOnlyAuthority";
      msg: "vaultAdminOnlyAuthority";
    },
    {
      code: 6074;
      name: "vaultAdminOracleProgramMismatch";
      msg: "vaultAdminOracleProgramMismatch";
    },
    {
      code: 6075;
      name: "vaultAdminInvalidVaultType";
      msg: "vaultAdminInvalidVaultType";
    },
    {
      code: 6076;
      name: "vaultAdminInvalidDexProgram";
      msg: "vaultAdminInvalidDexProgram";
    },
    {
      code: 6077;
      name: "vaultAdminInvalidDexPool";
      msg: "vaultAdminInvalidDexPool";
    },
    {
      code: 6078;
      name: "vaultCpiToDexFailed";
      msg: "vaultCpiToDexFailed";
    },
    {
      code: 6079;
      name: "vaultDexAccountsRequired";
      msg: "vaultDexAccountsRequired";
    },
    {
      code: 6080;
      name: "vaultInvalidDexPool";
      msg: "vaultInvalidDexPool";
    },
    {
      code: 6081;
      name: "vaultInvalidVaultTypeForDex";
      msg: "vaultInvalidVaultTypeForDex";
    },
    {
      code: 6082;
      name: "vaultOperateDexImperfectMaxUsePerfect";
      msg: "vaultOperateDexImperfectMaxUsePerfect";
    },
    {
      code: 6083;
      name: "vaultOperateDexNftIdMismatch";
      msg: "vaultOperateDexNftIdMismatch";
    },
    {
      code: 6084;
      name: "vaultAdminSupplyTokenRequired";
      msg: "vaultAdminSupplyTokenRequired";
    },
    {
      code: 6085;
      name: "vaultAdminBorrowTokenRequired";
      msg: "vaultAdminBorrowTokenRequired";
    },
    {
      code: 6086;
      name: "vaultAdminRateMagnifierNotAllowedForSmartLeg";
      msg: "vaultAdminRateMagnifierNotAllowedForSmartLeg";
    },
    {
      code: 6087;
      name: "vaultDexDebtSharesPaidMoreThanAvailableLiquidation";
      msg: "vaultDexDebtSharesPaidMoreThanAvailableLiquidation";
    },
    {
      code: 6088;
      name: "vaultSignerSupplyTokenAccountRequired";
      msg: "vaultSignerSupplyTokenAccountRequired";
    },
    {
      code: 6089;
      name: "vaultSignerBorrowTokenAccountRequired";
      msg: "vaultSignerBorrowTokenAccountRequired";
    },
    {
      code: 6090;
      name: "vaultInvalidVaultTypeForOperate";
      msg: "vaultInvalidVaultTypeForOperate";
    },
    {
      code: 6091;
      name: "vaultSupplyTokenRequired";
      msg: "vaultSupplyTokenRequired";
    },
    {
      code: 6092;
      name: "vaultBorrowTokenRequired";
      msg: "vaultBorrowTokenRequired";
    },
    {
      code: 6093;
      name: "vaultSupplyReservesRequired";
      msg: "vaultSupplyReservesRequired";
    },
    {
      code: 6094;
      name: "vaultBorrowReservesRequired";
      msg: "vaultBorrowReservesRequired";
    },
    {
      code: 6095;
      name: "vaultSupplyDexRequired";
      msg: "vaultSupplyDexRequired";
    },
    {
      code: 6096;
      name: "vaultBorrowDexRequired";
      msg: "vaultBorrowDexRequired";
    },
    {
      code: 6097;
      name: "vaultSupplyRateModelRequired";
      msg: "vaultSupplyRateModelRequired";
    },
    {
      code: 6098;
      name: "vaultBorrowRateModelRequired";
      msg: "vaultBorrowRateModelRequired";
    },
    {
      code: 6099;
      name: "vaultSupplyTokenProgramRequired";
      msg: "vaultSupplyTokenProgramRequired";
    },
    {
      code: 6100;
      name: "vaultBorrowTokenProgramRequired";
      msg: "vaultBorrowTokenProgramRequired";
    },
    {
      code: 6101;
      name: "vaultSupplyVaultAccountRequired";
      msg: "vaultSupplyVaultAccountRequired";
    },
    {
      code: 6102;
      name: "vaultBorrowVaultAccountRequired";
      msg: "vaultBorrowVaultAccountRequired";
    },
    {
      code: 6103;
      name: "vaultUserBorrowPositionRequired";
      msg: "vaultUserBorrowPositionRequired";
    },
    {
      code: 6104;
      name: "vaultLiquidateColAmountsRequired";
      msg: "vaultLiquidateColAmountsRequired";
    },
    {
      code: 6105;
      name: "vaultLiquidateDebtAmountsRequired";
      msg: "vaultLiquidateDebtAmountsRequired";
    },
    {
      code: 6106;
      name: "vaultInvalidDexOracleProgram";
      msg: "vaultInvalidDexOracleProgram";
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
      name: "branch";
      docs: ["Branch data structure"];
      serialization: "bytemuck";
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultId";
            type: "u16";
          },
          {
            name: "branchId";
            type: "u32";
          },
          {
            name: "status";
            type: "u8";
          },
          {
            name: "minimaTick";
            type: "i32";
          },
          {
            name: "minimaTickPartials";
            type: "u32";
          },
          {
            name: "debtLiquidity";
            type: "u64";
          },
          {
            name: "debtFactor";
            type: "u64";
          },
          {
            name: "connectedBranchId";
            type: "u32";
          },
          {
            name: "connectedMinimaTick";
            type: "i32";
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
      name: "initVaultConfigParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "supplyRateMagnifier";
            type: "i16";
          },
          {
            name: "borrowRateMagnifier";
            type: "i16";
          },
          {
            name: "collateralFactor";
            type: "u16";
          },
          {
            name: "liquidationThreshold";
            type: "u16";
          },
          {
            name: "liquidationMaxLimit";
            type: "u16";
          },
          {
            name: "withdrawGap";
            type: "u16";
          },
          {
            name: "liquidationPenalty";
            type: "u16";
          },
          {
            name: "borrowFee";
            type: "u8";
          },
          {
            name: "vaultType";
            type: "u8";
          },
          {
            name: "rebalancer";
            type: "pubkey";
          },
          {
            name: "liquidityProgram";
            type: "pubkey";
          },
          {
            name: "oracleProgram";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "liquidateDexColAmounts";
      docs: [
        "T2/T4 smart collateral: minimum token amounts per WHOLE collateral share",
        "(1e9 precision — Solana DEX shares are 9-decimal, unlike Solidity's 1e18).",
        "After the core liquidation, the vault calls DEX `withdraw_perfect` (or",
        "`withdraw_perfect_in_one_token`) with per-share slippage bounds computed as",
        "`token_per_unit_shares * actual_col_shares / 1e9` (see `SHARES_PRECISION`).",
        "Set a field to `0` to receive the full withdrawal in the *other* token only.",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "token0PerUnitShares";
            type: "u64";
          },
          {
            name: "token1PerUnitShares";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "liquidateDexDebtAmounts";
      docs: [
        "T3/T4 smart debt: liquidator-supplied token amounts + minimum shares to burn.",
        "The vault calls DEX `payback(token0, token1, shares_min)`; tokens are debited from",
        "the liquidator's DEX pool token accounts (signer-owned ATAs for token0/token1).",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "token0";
            type: "u64";
          },
          {
            name: "token1";
            type: "u64";
          },
          {
            name: "sharesMin";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "liquidatePerfectDexDebtAmounts";
      docs: [
        "T3/T4 smart debt: maximum token amounts per WHOLE debt share for `payback_perfect`",
        "(1e9 precision — Solana DEX shares are 9-decimal, unlike Solidity's 1e18).",
        "After the core liquidation, the vault calls DEX `payback_perfect` with",
        "`token_per_unit_shares * actual_debt_shares / 1e9` as the per-token max",
        "(see `SHARES_PRECISION`).",
        "Set a field to `0` to pay back entirely in the *other* token only.",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "token0PerUnitShares";
            type: "u64";
          },
          {
            name: "token1PerUnitShares";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logAbsorb";
      type: {
        kind: "struct";
        fields: [
          {
            name: "colAmount";
            type: "u64";
          },
          {
            name: "debtAmount";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logClosePosition";
      type: {
        kind: "struct";
        fields: [
          {
            name: "signer";
            type: "pubkey";
          },
          {
            name: "positionId";
            type: "u32";
          },
          {
            name: "vaultId";
            type: "u16";
          },
          {
            name: "positionMint";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logInitBranch";
      type: {
        kind: "struct";
        fields: [
          {
            name: "branch";
            type: "pubkey";
          },
          {
            name: "branchId";
            type: "u32";
          },
        ];
      };
    },
    {
      name: "logInitTick";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tick";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logInitTickHasDebtArray";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tickHasDebtArray";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logInitTickIdLiquidation";
      type: {
        kind: "struct";
        fields: [
          {
            name: "tickIdLiquidation";
            type: "pubkey";
          },
          {
            name: "tick";
            type: "i32";
          },
        ];
      };
    },
    {
      name: "logInitVaultConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultConfig";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logInitVaultState";
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultState";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logLiquidate";
      type: {
        kind: "struct";
        fields: [
          {
            name: "signer";
            type: "pubkey";
          },
          {
            name: "colAmount";
            type: "u64";
          },
          {
            name: "debtAmount";
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
      name: "logLiquidateInfo";
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultId";
            type: "u16";
          },
          {
            name: "startTick";
            type: "i32";
          },
          {
            name: "endTick";
            type: "i32";
          },
        ];
      };
    },
    {
      name: "logLiquidationRoundingDiff";
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultId";
            type: "u16";
          },
          {
            name: "actualDebtAmt";
            type: "u64";
          },
          {
            name: "debtAmount";
            type: "u64";
          },
          {
            name: "diff";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logOperate";
      type: {
        kind: "struct";
        fields: [
          {
            name: "signer";
            type: "pubkey";
          },
          {
            name: "nftId";
            type: "u32";
          },
          {
            name: "newCol";
            type: "i128";
          },
          {
            name: "newDebt";
            type: "i128";
          },
          {
            name: "to";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logRebalance";
      type: {
        kind: "struct";
        fields: [
          {
            name: "supplyAmt";
            type: "i128";
          },
          {
            name: "borrowAmt";
            type: "i128";
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
      name: "logUpdateBorrowFee";
      type: {
        kind: "struct";
        fields: [
          {
            name: "borrowFee";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "logUpdateBorrowRateMagnifier";
      type: {
        kind: "struct";
        fields: [
          {
            name: "borrowRateMagnifier";
            type: "i16";
          },
        ];
      };
    },
    {
      name: "logUpdateCollateralFactor";
      type: {
        kind: "struct";
        fields: [
          {
            name: "collateralFactor";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "logUpdateCoreSettings";
      type: {
        kind: "struct";
        fields: [
          {
            name: "supplyRateMagnifier";
            type: "i16";
          },
          {
            name: "borrowRateMagnifier";
            type: "i16";
          },
          {
            name: "collateralFactor";
            type: "u16";
          },
          {
            name: "liquidationThreshold";
            type: "u16";
          },
          {
            name: "liquidationMaxLimit";
            type: "u16";
          },
          {
            name: "withdrawGap";
            type: "u16";
          },
          {
            name: "liquidationPenalty";
            type: "u16";
          },
          {
            name: "borrowFee";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "logUpdateExchangePrices";
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultSupplyExchangePrice";
            type: "u64";
          },
          {
            name: "vaultBorrowExchangePrice";
            type: "u64";
          },
          {
            name: "liquiditySupplyExchangePrice";
            type: "u64";
          },
          {
            name: "liquidityBorrowExchangePrice";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logUpdateLiquidationMaxLimit";
      type: {
        kind: "struct";
        fields: [
          {
            name: "liquidationMaxLimit";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "logUpdateLiquidationPenalty";
      type: {
        kind: "struct";
        fields: [
          {
            name: "liquidationPenalty";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "logUpdateLiquidationThreshold";
      type: {
        kind: "struct";
        fields: [
          {
            name: "liquidationThreshold";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "logUpdateLookupTable";
      type: {
        kind: "struct";
        fields: [
          {
            name: "lookupTable";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logUpdateOracle";
      type: {
        kind: "struct";
        fields: [
          {
            name: "newOracle";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logUpdateRebalancer";
      type: {
        kind: "struct";
        fields: [
          {
            name: "newRebalancer";
            type: "pubkey";
          },
        ];
      };
    },
    {
      name: "logUpdateSupplyRateMagnifier";
      type: {
        kind: "struct";
        fields: [
          {
            name: "supplyRateMagnifier";
            type: "i16";
          },
        ];
      };
    },
    {
      name: "logUpdateWithdrawGap";
      type: {
        kind: "struct";
        fields: [
          {
            name: "withdrawGap";
            type: "u16";
          },
        ];
      };
    },
    {
      name: "logUserPosition";
      type: {
        kind: "struct";
        fields: [
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "nftId";
            type: "u32";
          },
          {
            name: "vaultId";
            type: "u16";
          },
          {
            name: "positionMint";
            type: "pubkey";
          },
          {
            name: "tick";
            type: "i32";
          },
          {
            name: "col";
            type: "u64";
          },
          {
            name: "borrow";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "operateDexAmounts";
      docs: [
        "Smart-side amounts for one imperfect DEX operate leg.",
        "`token0` / `token1` — primary token amounts (positive = deposit/borrow, negative = withdraw/payback).",
        "`shares_min_max`     — slippage: min shares to receive (deposit/borrow) or max shares to burn (withdraw/payback).",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "token0";
            type: "i128";
          },
          {
            name: "token1";
            type: "i128";
          },
          {
            name: "sharesMinMax";
            type: "i128";
          },
        ];
      };
    },
    {
      name: "operateDexColAmounts";
      docs: [
        "Collateral leg for `operate_dex` (imperfect).",
        "`amounts`  — DEX amounts for smart col (T2/T4).",
        "`new_col`  — token delta for non-smart col (T1/T3).",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "amounts";
            type: {
              option: {
                defined: {
                  name: "operateDexAmounts";
                };
              };
            };
          },
          {
            name: "newCol";
            type: {
              option: "i128";
            };
          },
        ];
      };
    },
    {
      name: "operateDexDebtAmounts";
      docs: [
        "Debt leg for `operate_dex` (imperfect).",
        "`amounts`   — DEX amounts for smart debt (T3/T4).",
        "`new_debt`  — token delta for non-smart debt (T1/T2).",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "amounts";
            type: {
              option: {
                defined: {
                  name: "operateDexAmounts";
                };
              };
            };
          },
          {
            name: "newDebt";
            type: {
              option: "i128";
            };
          },
        ];
      };
    },
    {
      name: "operatePerfectDexAmounts";
      docs: [
        "Smart-side amounts for one perfect DEX operate leg.",
        "`perfect_shares`  — primary: shares to operate (positive = deposit/borrow, negative = withdraw/payback).",
        "Pass `i128::MIN` to request max-withdrawal / max-payback.",
        "`token0_min_max`  — slippage bound for token0:",
        "deposit/payback → max tokens to spend  (positive for deposit, negative for payback)",
        "withdraw/borrow → min tokens to receive (negative for withdraw, positive for borrow)",
        "Set to 0 to receive the full withdrawal / payback in the *other* token only.",
        "`token1_min_max`  — same semantics as `token0_min_max` for token1.",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "perfectShares";
            type: "i128";
          },
          {
            name: "token0MinMax";
            type: "i128";
          },
          {
            name: "token1MinMax";
            type: "i128";
          },
        ];
      };
    },
    {
      name: "operatePerfectDexColAmounts";
      docs: [
        "Collateral leg for `operate_perfect_dex`.",
        "`amounts`  — perfect DEX amounts for smart col (T2/T4).",
        "`new_col`  — token delta for non-smart col (T1/T3).",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "amounts";
            type: {
              option: {
                defined: {
                  name: "operatePerfectDexAmounts";
                };
              };
            };
          },
          {
            name: "newCol";
            type: {
              option: "i128";
            };
          },
        ];
      };
    },
    {
      name: "operatePerfectDexDebtAmounts";
      docs: [
        "Debt leg for `operate_perfect_dex`.",
        "`amounts`   — perfect DEX amounts for smart debt (T3/T4).",
        "`new_debt`  — token delta for non-smart debt (T1/T2).",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "amounts";
            type: {
              option: {
                defined: {
                  name: "operatePerfectDexAmounts";
                };
              };
            };
          },
          {
            name: "newDebt";
            type: {
              option: "i128";
            };
          },
        ];
      };
    },
    {
      name: "oracle";
      type: {
        kind: "struct";
        fields: [
          {
            name: "nonce";
            type: "u16";
          },
          {
            name: "sources";
            type: {
              vec: {
                defined: {
                  name: "sources";
                };
              };
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
      name: "position";
      docs: ["Position data structure"];
      serialization: "bytemuck";
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultId";
            type: "u16";
          },
          {
            name: "nftId";
            type: "u32";
          },
          {
            name: "positionMint";
            type: "pubkey";
          },
          {
            name: "isSupplyOnlyPosition";
            type: "u8";
          },
          {
            name: "tick";
            type: "i32";
          },
          {
            name: "tickId";
            type: "u32";
          },
          {
            name: "supplyAmount";
            type: "u64";
          },
          {
            name: "dustDebtAmount";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "sourceType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "pyth";
          },
          {
            name: "stakePool";
          },
          {
            name: "msolPool";
          },
          {
            name: "redstone";
          },
          {
            name: "chainlink";
          },
          {
            name: "singlePool";
          },
          {
            name: "jupLend";
          },
          {
            name: "chainlinkDataStreams";
          },
          {
            name: "pstPool";
          },
          {
            name: "dexSmartColPegOracle";
          },
          {
            name: "dexSmartDebtPegOracle";
          },
        ];
      };
    },
    {
      name: "sources";
      type: {
        kind: "struct";
        fields: [
          {
            name: "source";
            type: "pubkey";
          },
          {
            name: "invert";
            type: "bool";
          },
          {
            name: "multiplier";
            type: "u128";
          },
          {
            name: "divisor";
            type: "u128";
          },
          {
            name: "sourceType";
            type: {
              defined: {
                name: "sourceType";
              };
            };
          },
        ];
      };
    },
    {
      name: "tick";
      docs: ["Tick data structure"];
      serialization: "bytemuck";
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultId";
            type: "u16";
          },
          {
            name: "tick";
            type: "i32";
          },
          {
            name: "isLiquidated";
            type: "u8";
          },
          {
            name: "totalIds";
            type: "u32";
          },
          {
            name: "rawDebt";
            type: "u64";
          },
          {
            name: "isFullyLiquidated";
            type: "u8";
          },
          {
            name: "liquidationBranchId";
            type: "u32";
          },
          {
            name: "debtFactor";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "tickHasDebt";
      docs: [
        "Tick has debt structure",
        "Each TickHasDebt can track 8 * 256 = 2048 ticks",
        "children_bits has 32 bytes = 256 bits total",
        "Each map within the array covers 256 ticks",
      ];
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "childrenBits";
            type: {
              array: ["u8", 32];
            };
          },
        ];
      };
    },
    {
      name: "tickHasDebtArray";
      serialization: "bytemuck";
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultId";
            type: "u16";
          },
          {
            name: "index";
            type: "u8";
          },
          {
            name: "tickHasDebt";
            docs: [
              "Each array contains 8 TickHasDebt structs",
              "Each TickHasDebt covers 256 ticks",
              "Total: 8 * 256 = 2048 ticks per TickHasDebtArray",
            ];
            type: {
              array: [
                {
                  defined: {
                    name: "tickHasDebt";
                  };
                },
                8,
              ];
            };
          },
        ];
      };
    },
    {
      name: "tickIdLiquidation";
      docs: ["Tick ID liquidation data"];
      serialization: "bytemuck";
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultId";
            type: "u16";
          },
          {
            name: "tick";
            type: "i32";
          },
          {
            name: "tickMap";
            type: "u32";
          },
          {
            name: "isFullyLiquidated1";
            type: "u8";
          },
          {
            name: "liquidationBranchId1";
            type: "u32";
          },
          {
            name: "debtFactor1";
            type: "u64";
          },
          {
            name: "isFullyLiquidated2";
            type: "u8";
          },
          {
            name: "liquidationBranchId2";
            type: "u32";
          },
          {
            name: "debtFactor2";
            type: "u64";
          },
          {
            name: "isFullyLiquidated3";
            type: "u8";
          },
          {
            name: "liquidationBranchId3";
            type: "u32";
          },
          {
            name: "debtFactor3";
            type: "u64";
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
      name: "transferType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "skip";
          },
          {
            name: "direct";
          },
          {
            name: "claim";
          },
        ];
      };
    },
    {
      name: "updateCoreSettingsParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "supplyRateMagnifier";
            type: "i16";
          },
          {
            name: "borrowRateMagnifier";
            type: "i16";
          },
          {
            name: "collateralFactor";
            type: "u16";
          },
          {
            name: "liquidationThreshold";
            type: "u16";
          },
          {
            name: "liquidationMaxLimit";
            type: "u16";
          },
          {
            name: "withdrawGap";
            type: "u16";
          },
          {
            name: "liquidationPenalty";
            type: "u16";
          },
          {
            name: "borrowFee";
            type: "u8";
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
    {
      name: "vaultAdmin";
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
            name: "nextVaultId";
            type: "u16";
          },
          {
            name: "auths";
            type: {
              vec: "pubkey";
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
      name: "vaultConfig";
      serialization: "bytemuck";
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultId";
            type: "u16";
          },
          {
            name: "supplyRateMagnifier";
            type: "i16";
          },
          {
            name: "borrowRateMagnifier";
            type: "i16";
          },
          {
            name: "collateralFactor";
            type: "u16";
          },
          {
            name: "liquidationThreshold";
            type: "u16";
          },
          {
            name: "liquidationMaxLimit";
            type: "u16";
          },
          {
            name: "withdrawGap";
            type: "u16";
          },
          {
            name: "liquidationPenalty";
            type: "u16";
          },
          {
            name: "borrowFee";
            type: "u8";
          },
          {
            name: "vaultType";
            type: "u8";
          },
          {
            name: "oracle";
            type: "pubkey";
          },
          {
            name: "rebalancer";
            type: "pubkey";
          },
          {
            name: "liquidityProgram";
            type: "pubkey";
          },
          {
            name: "oracleProgram";
            type: "pubkey";
          },
          {
            name: "supplyToken";
            type: "pubkey";
          },
          {
            name: "borrowToken";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "vaultMetadata";
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultId";
            type: "u16";
          },
          {
            name: "lookupTable";
            type: "pubkey";
          },
          {
            name: "supplyMintDecimals";
            type: "u8";
          },
          {
            name: "borrowMintDecimals";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "vaultState";
      serialization: "bytemuck";
      repr: {
        kind: "c";
        packed: true;
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "vaultId";
            type: "u16";
          },
          {
            name: "branchLiquidated";
            type: "u8";
          },
          {
            name: "topmostTick";
            type: "i32";
          },
          {
            name: "currentBranchId";
            type: "u32";
          },
          {
            name: "totalBranchId";
            type: "u32";
          },
          {
            name: "totalSupply";
            type: "u64";
          },
          {
            name: "totalBorrow";
            type: "u64";
          },
          {
            name: "totalPositions";
            type: "u32";
          },
          {
            name: "absorbedDebtAmount";
            type: "u128";
          },
          {
            name: "absorbedColAmount";
            type: "u128";
          },
          {
            name: "absorbedDustDebt";
            type: "u64";
          },
          {
            name: "liquiditySupplyExchangePrice";
            type: "u64";
          },
          {
            name: "liquidityBorrowExchangePrice";
            type: "u64";
          },
          {
            name: "vaultSupplyExchangePrice";
            type: "u64";
          },
          {
            name: "vaultBorrowExchangePrice";
            type: "u64";
          },
          {
            name: "nextPositionId";
            type: "u32";
          },
          {
            name: "lastUpdateTimestamp";
            type: "u64";
          },
        ];
      };
    },
  ];
};
