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
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "closePosition";
      discriminator: [123, 134, 81, 0, 49, 68, 98, 98];
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
          name: "vaultConfig";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "position";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "positionMint";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
        },
        {
          name: "positionTokenAccount";
          docs: ["@dev Verification inside instruction logic"];
          writable: true;
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
                  70
                ];
              },
              {
                kind: "account";
                path: "positionMint";
              }
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
                70
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "positionId";
          type: "u32";
        }
      ];
    },
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
        }
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
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "branchId";
          type: "u32";
        }
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
              }
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
                  116
                ];
              },
              {
                kind: "arg";
                path: "vaultId";
              },
              {
                kind: "arg";
                path: "nextPositionId";
              }
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
                  169
                ];
              },
              {
                kind: "account";
                path: "positionMint";
              }
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
                89
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
                  70
                ];
              },
              {
                kind: "account";
                path: "positionMint";
              }
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
                70
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "nextPositionId";
          type: "u32";
        }
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "tick";
          type: "i32";
        }
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
                  116
                ];
              },
              {
                kind: "arg";
                path: "vaultId";
              },
              {
                kind: "arg";
                path: "index";
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "index";
          type: "u8";
        }
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
        }
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
        }
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
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "liquidity";
          type: "pubkey";
        },
        {
          name: "authority";
          type: "pubkey";
        }
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
                  103
                ];
              },
              {
                kind: "arg";
                path: "vaultId";
              }
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
                  97
                ];
              },
              {
                kind: "arg";
                path: "vaultId";
              }
            ];
          };
        },
        {
          name: "oracle";
        },
        {
          name: "supplyToken";
        },
        {
          name: "borrowToken";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
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
        }
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
          writable: true;
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
              }
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        }
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
          pda: {
            seeds: [
              {
                kind: "account";
                path: "signer";
              },
              {
                kind: "account";
                path: "borrowTokenProgram";
              },
              {
                kind: "account";
                path: "borrowToken";
              }
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
                89
              ];
            };
          };
        },
        {
          name: "to";
        },
        {
          name: "toTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "to";
              },
              {
                kind: "account";
                path: "supplyTokenProgram";
              },
              {
                kind: "account";
                path: "supplyToken";
              }
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
                89
              ];
            };
          };
        },
        {
          name: "vaultConfig";
          docs: [
            "@dev mut because this PDA signs the CPI to liquidity program",
            "@dev verification inside instruction logic"
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
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "oracleProgram";
        }
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
        }
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
          pda: {
            seeds: [
              {
                kind: "account";
                path: "signer";
              },
              {
                kind: "account";
                path: "supplyTokenProgram";
              },
              {
                kind: "account";
                path: "supplyToken";
              }
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
                89
              ];
            };
          };
        },
        {
          name: "signerBorrowTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "signer";
              },
              {
                kind: "account";
                path: "borrowTokenProgram";
              },
              {
                kind: "account";
                path: "borrowToken";
              }
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
                89
              ];
            };
          };
        },
        {
          name: "recipient";
          optional: true;
        },
        {
          name: "recipientBorrowTokenAccount";
          writable: true;
          optional: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "recipient";
              },
              {
                kind: "account";
                path: "borrowTokenProgram";
              },
              {
                kind: "account";
                path: "borrowToken";
              }
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
                89
              ];
            };
          };
        },
        {
          name: "recipientSupplyTokenAccount";
          writable: true;
          optional: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "recipient";
              },
              {
                kind: "account";
                path: "supplyTokenProgram";
              },
              {
                kind: "account";
                path: "supplyToken";
              }
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
                89
              ];
            };
          };
        },
        {
          name: "vaultConfig";
          docs: [
            "@dev mut because this PDA signs the CPI to liquidity program",
            "@dev verification inside instruction logic"
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
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
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
        }
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
              }
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
                89
              ];
            };
          };
        },
        {
          name: "rebalancerBorrowTokenAccount";
          writable: true;
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
              }
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
                89
              ];
            };
          };
        },
        {
          name: "vaultConfig";
          docs: [
            "@dev mut because this PDA signs the CPI to liquidity program",
            "@dev verification inside instruction logic"
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
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        }
      ];
      args: [];
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
        }
      ];
      args: [
        {
          name: "newAuthority";
          type: "pubkey";
        }
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
        }
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
        }
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "borrowFee";
          type: "u16";
        }
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "borrowRateMagnifier";
          type: "i16";
        }
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "collateralFactor";
          type: "u16";
        }
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
        }
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
        }
      ];
    },
    {
      name: "updateExchangePrices";
      discriminator: [209, 14, 188, 95, 242, 20, 119, 196];
      accounts: [
        {
          name: "signer";
          signer: true;
        },
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        }
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "liquidationMaxLimit";
          type: "u16";
        }
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "liquidationPenalty";
          type: "u16";
        }
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "liquidationThreshold";
          type: "u16";
        }
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "lookupTable";
          type: "pubkey";
        }
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
          writable: true;
        },
        {
          name: "supplyTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        },
        {
          name: "borrowTokenReservesLiquidity";
          docs: ["@dev Verification inside instruction logic"];
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        }
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "newRebalancer";
          type: "pubkey";
        }
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "supplyRateMagnifier";
          type: "i16";
        }
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
        }
      ];
      args: [
        {
          name: "vaultId";
          type: "u16";
        },
        {
          name: "withdrawGap";
          type: "u16";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "branch";
      discriminator: [14, 63, 100, 50, 25, 8, 29, 5];
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
    }
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
    }
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
      name: "vaultLiquidationReverts";
      msg: "vaultLiquidationReverts";
    },
    {
      code: 6030;
      name: "vaultInvalidOraclePrice";
      msg: "vaultInvalidOraclePrice";
    },
    {
      code: 6031;
      name: "vaultBranchNotFound";
      msg: "vaultBranchNotFound";
    },
    {
      code: 6032;
      name: "vaultTickNotFound";
      msg: "vaultTickNotFound";
    },
    {
      code: 6033;
      name: "vaultTickHasDebtNotFound";
      msg: "vaultTickHasDebtNotFound";
    },
    {
      code: 6034;
      name: "vaultTickMismatch";
      msg: "vaultTickMismatch";
    },
    {
      code: 6035;
      name: "vaultInvalidVaultId";
      msg: "vaultInvalidVaultId";
    },
    {
      code: 6036;
      name: "vaultInvalidNextPositionId";
      msg: "vaultInvalidNextPositionId";
    },
    {
      code: 6037;
      name: "vaultInvalidPositionId";
      msg: "vaultInvalidPositionId";
    },
    {
      code: 6038;
      name: "vaultPositionNotEmpty";
      msg: "vaultPositionNotEmpty";
    },
    {
      code: 6039;
      name: "vaultInvalidSupplyMint";
      msg: "vaultInvalidSupplyMint";
    },
    {
      code: 6040;
      name: "vaultInvalidBorrowMint";
      msg: "vaultInvalidBorrowMint";
    },
    {
      code: 6041;
      name: "vaultInvalidOracle";
      msg: "vaultInvalidOracle";
    },
    {
      code: 6042;
      name: "vaultInvalidTick";
      msg: "vaultInvalidTick";
    },
    {
      code: 6043;
      name: "vaultInvalidLiquidityProgram";
      msg: "vaultInvalidLiquidityProgram";
    },
    {
      code: 6044;
      name: "vaultInvalidPositionAuthority";
      msg: "vaultInvalidPositionAuthority";
    },
    {
      code: 6045;
      name: "vaultOracleNotValid";
      msg: "vaultOracleNotValid";
    },
    {
      code: 6046;
      name: "vaultBranchOwnerNotValid";
      msg: "vaultBranchOwnerNotValid";
    },
    {
      code: 6047;
      name: "vaultTickHasDebtOwnerNotValid";
      msg: "vaultTickHasDebtOwnerNotValid";
    },
    {
      code: 6048;
      name: "vaultTickOwnerNotValid";
      msg: "vaultTickDataOwnerNotValid";
    },
    {
      code: 6049;
      name: "vaultLiquidateRemainingAccountsTooShort";
      msg: "vaultLiquidateRemainingAccountsTooShort";
    },
    {
      code: 6050;
      name: "vaultOperateRemainingAccountsTooShort";
      msg: "vaultOperateRemainingAccountsTooShort";
    },
    {
      code: 6051;
      name: "vaultInvalidZerothBranch";
      msg: "vaultInvalidZerothBranch";
    },
    {
      code: 6052;
      name: "vaultCpiToLiquidityFailed";
      msg: "vaultCpiToLiquidityFailed";
    },
    {
      code: 6053;
      name: "vaultCpiToOracleFailed";
      msg: "vaultCpiToOracleFailed";
    },
    {
      code: 6054;
      name: "vaultOnlyAuthority";
      msg: "vaultOnlyAuthority";
    },
    {
      code: 6055;
      name: "vaultNewBranchInvalid";
      msg: "vaultNewBranchInvalid";
    },
    {
      code: 6056;
      name: "vaultTickHasDebtIndexMismatch";
      msg: "vaultTickHasDebtIndexMismatch";
    },
    {
      code: 6057;
      name: "vaultTickHasDebtOutOfRange";
      msg: "vaultTickHasDebtOutOfRange";
    },
    {
      code: 6058;
      name: "vaultUserSupplyPositionRequired";
      msg: "vaultUserSupplyPositionRequired";
    },
    {
      code: 6059;
      name: "vaultClaimAccountRequired";
      msg: "vaultClaimAccountRequired";
    },
    {
      code: 6060;
      name: "vaultRecipientWithdrawAccountRequired";
      msg: "vaultRecipientWithdrawAccountRequired";
    },
    {
      code: 6061;
      name: "vaultRecipientBorrowAccountRequired";
      msg: "vaultRecipientBorrowAccountRequired";
    },
    {
      code: 6062;
      name: "vaultPositionAboveLiquidationThreshold";
      msg: "vaultPositionAboveLiquidationThreshold";
    },
    {
      code: 6063;
      name: "vaultAdminValueAboveLimit";
      msg: "vaultAdminValueAboveLimit";
    },
    {
      code: 6064;
      name: "vaultAdminOnlyAuths";
      msg: "vaultAdminOnlyAuthAccounts";
    },
    {
      code: 6065;
      name: "vaultAdminAddressZeroNotAllowed";
      msg: "vaultAdminAddressZeroNotAllowed";
    },
    {
      code: 6066;
      name: "vaultAdminVaultIdMismatch";
      msg: "vaultAdminVaultIdMismatch";
    },
    {
      code: 6067;
      name: "vaultAdminTotalIdsMismatch";
      msg: "vaultAdminTotalIdsMismatch";
    },
    {
      code: 6068;
      name: "vaultAdminTickMismatch";
      msg: "vaultAdminTickMismatch";
    },
    {
      code: 6069;
      name: "vaultAdminLiquidityProgramMismatch";
      msg: "vaultAdminLiquidityProgramMismatch";
    },
    {
      code: 6070;
      name: "vaultAdminMaxAuthCountReached";
      msg: "vaultAdminMaxAuthCountReached";
    },
    {
      code: 6071;
      name: "vaultAdminInvalidParams";
      msg: "vaultAdminInvalidParams";
    },
    {
      code: 6072;
      name: "vaultAdminOnlyAuthority";
      msg: "vaultAdminOnlyAuthority";
    },
    {
      code: 6073;
      name: "vaultAdminOracleProgramMismatch";
      msg: "vaultAdminOracleProgramMismatch";
    }
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
          }
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
          }
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
            type: "u16";
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
            type: "u16";
          }
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
          }
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
          }
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
            type: "u16";
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
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
          }
        ];
      };
    },
    {
      name: "tickHasDebt";
      docs: [
        "Tick has debt structure",
        "Each TickHasDebt can track 8 * 256 = 2048 ticks",
        "children_bits has 32 bytes = 256 bits total",
        "Each map within the array covers 256 ticks"
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
          }
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
              "Total: 8 * 256 = 2048 ticks per TickHasDebtArray"
            ];
            type: {
              array: [
                {
                  defined: {
                    name: "tickHasDebt";
                  };
                },
                8
              ];
            };
          }
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
          }
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
          }
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
          }
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
            type: "u16";
          }
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
          }
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
            type: "u128";
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
            type: "u64";
          },
          {
            name: "baseWithdrawalLimit";
            type: "u64";
          },
          {
            name: "status";
            type: "u8";
          }
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
          }
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
            type: "u16";
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
          }
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
          }
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
          }
        ];
      };
    }
  ];
};
