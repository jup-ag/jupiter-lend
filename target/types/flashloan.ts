/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/flashloan.json`.
 */
export type Flashloan = {
  address: "jupgfSgfuAXv4B6R2Uxu85Z1qdzgju79s6MfZekN6XS";
  metadata: {
    name: "flashloan";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "activateProtocol";
      discriminator: [230, 235, 188, 19, 120, 91, 11, 94];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "flashloanAdmin";
          writable: true;
        }
      ];
      args: [];
    },
    {
      name: "flashloanBorrow";
      discriminator: [103, 19, 78, 24, 240, 9, 135, 63];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "flashloanAdmin";
          writable: true;
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
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mint";
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
          name: "mint";
        },
        {
          name: "flashloanTokenReservesLiquidity";
          writable: true;
        },
        {
          name: "flashloanBorrowPositionOnLiquidity";
          writable: true;
        },
        {
          name: "rateModel";
        },
        {
          name: "vault";
          writable: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
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
          name: "instructionSysvar";
          address: "Sysvar1nstructions1111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "flashloanPayback";
      discriminator: [213, 47, 153, 137, 84, 243, 94, 232];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "flashloanAdmin";
          writable: true;
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
                path: "tokenProgram";
              },
              {
                kind: "account";
                path: "mint";
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
          name: "mint";
        },
        {
          name: "flashloanTokenReservesLiquidity";
          writable: true;
        },
        {
          name: "flashloanBorrowPositionOnLiquidity";
          writable: true;
        },
        {
          name: "rateModel";
        },
        {
          name: "vault";
          writable: true;
        },
        {
          name: "liquidity";
        },
        {
          name: "liquidityProgram";
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
          name: "instructionSysvar";
          address: "Sysvar1nstructions1111111111111111111111111";
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "initFlashloanAdmin";
      discriminator: [185, 117, 154, 56, 95, 12, 187, 139];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "flashloanAdmin";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  102,
                  108,
                  97,
                  115,
                  104,
                  108,
                  111,
                  97,
                  110,
                  95,
                  97,
                  100,
                  109,
                  105,
                  110
                ];
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
          name: "authority";
          type: "pubkey";
        },
        {
          name: "flashloanFee";
          type: "u16";
        },
        {
          name: "liquidityProgram";
          type: "pubkey";
        }
      ];
    },
    {
      name: "pauseProtocol";
      discriminator: [144, 95, 0, 107, 119, 39, 248, 141];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "flashloanAdmin";
          writable: true;
        }
      ];
      args: [];
    },
    {
      name: "setFlashloanFee";
      discriminator: [120, 248, 221, 70, 84, 216, 0, 149];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "flashloanAdmin";
          writable: true;
        }
      ];
      args: [
        {
          name: "flashloanFee";
          type: "u16";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "flashloanAdmin";
      discriminator: [162, 161, 45, 28, 131, 91, 202, 88];
    }
  ];
  events: [
    {
      name: "activateProtocol";
      discriminator: [70, 178, 173, 151, 180, 166, 68, 102];
    },
    {
      name: "pauseProtocol";
      discriminator: [66, 229, 166, 147, 152, 13, 42, 29];
    },
    {
      name: "setFlashloanFee";
      discriminator: [112, 164, 66, 251, 191, 56, 0, 47];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "flashloanInvalidAuthority";
      msg: "flashloanInvalidAuthority";
    },
    {
      code: 6001;
      name: "flashloanFeeTooHigh";
      msg: "flashloanFeeTooHigh";
    },
    {
      code: 6002;
      name: "flashloanInvalidParams";
      msg: "flashloanInvalidParams";
    },
    {
      code: 6003;
      name: "flashloanAlreadyActive";
      msg: "flashloanAlreadyActive";
    },
    {
      code: 6004;
      name: "flashloanAlreadyInactive";
      msg: "flashloanAlreadyInactive";
    },
    {
      code: 6005;
      name: "flashloanCpiToLiquidityFailed";
      msg: "flashloanCpiToLiquidityFailed";
    },
    {
      code: 6006;
      name: "flashloanNotAllowedInThisSlot";
      msg: "flashloanNotAllowedInThisSlot";
    },
    {
      code: 6007;
      name: "flashloanInvalidInstructionSysvar";
      msg: "flashloanInvalidInstructionSysvar";
    },
    {
      code: 6008;
      name: "flashloanInvalidInstructionData";
      msg: "flashloanInvalidInstructionData";
    },
    {
      code: 6009;
      name: "flashloanPaybackNotFound";
      msg: "flashloanPaybackNotFound";
    }
  ];
  types: [
    {
      name: "activateProtocol";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "flashloanAdmin";
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
            name: "status";
            type: "bool";
          },
          {
            name: "flashloanFee";
            type: "u16";
          },
          {
            name: "flashloanTimestamp";
            type: "u64";
          },
          {
            name: "isFlashloanActive";
            type: "bool";
          },
          {
            name: "activeFlashloanAmount";
            type: "u64";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "pauseProtocol";
      type: {
        kind: "struct";
        fields: [];
      };
    },
    {
      name: "setFlashloanFee";
      type: {
        kind: "struct";
        fields: [
          {
            name: "flashloanFee";
            type: "u16";
          }
        ];
      };
    }
  ];
};
