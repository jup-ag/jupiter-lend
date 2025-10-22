/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/oracle.json`.
 */
export type Oracle = {
  address: "jupnw4B6Eqs7ft6rxpzYLJZYSnrpRgPcr589n5Kv4oc";
  metadata: {
    name: "oracle";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "getBothExchangeRate";
      discriminator: [92, 88, 161, 46, 230, 193, 46, 237];
      accounts: [
        {
          name: "oracle";
        }
      ];
      args: [
        {
          name: "nonce";
          type: "u16";
        }
      ];
    },
    {
      name: "getExchangeRate";
      discriminator: [153, 76, 17, 194, 170, 215, 89, 142];
      accounts: [
        {
          name: "oracle";
        }
      ];
      args: [
        {
          name: "nonce";
          type: "u16";
        }
      ];
      returns: "u128";
    },
    {
      name: "getExchangeRateLiquidate";
      discriminator: [228, 169, 73, 39, 91, 82, 27, 5];
      accounts: [
        {
          name: "oracle";
        }
      ];
      args: [
        {
          name: "nonce";
          type: "u16";
        }
      ];
      returns: "u128";
    },
    {
      name: "getExchangeRateOperate";
      discriminator: [174, 166, 126, 10, 122, 153, 94, 203];
      accounts: [
        {
          name: "oracle";
        }
      ];
      args: [
        {
          name: "nonce";
          type: "u16";
        }
      ];
      returns: "u128";
    },
    {
      name: "initAdmin";
      discriminator: [97, 65, 97, 27, 200, 206, 72, 219];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "oracleAdmin";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [111, 114, 97, 99, 108, 101, 95, 97, 100, 109, 105, 110];
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
        }
      ];
    },
    {
      name: "initOracleConfig";
      discriminator: [77, 144, 180, 246, 217, 15, 118, 92];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "oracleAdmin";
        },
        {
          name: "oracle";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [111, 114, 97, 99, 108, 101];
              },
              {
                kind: "arg";
                path: "nonce";
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
          name: "nonce";
          type: "u16";
        }
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
          name: "oracleAdmin";
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
          name: "authority";
          signer: true;
        },
        {
          name: "oracleAdmin";
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
    }
  ];
  accounts: [
    {
      name: "oracle";
      discriminator: [139, 194, 131, 179, 140, 179, 229, 244];
    },
    {
      name: "oracleAdmin";
      discriminator: [239, 232, 8, 20, 254, 63, 25, 246];
    }
  ];
  events: [
    {
      name: "logStakePoolHighFeeDetected";
      discriminator: [198, 106, 149, 7, 25, 83, 39, 155];
    },
    {
      name: "logUpdateAuthority";
      discriminator: [150, 152, 157, 143, 6, 135, 193, 101];
    },
    {
      name: "logUpdateAuths";
      discriminator: [88, 80, 109, 48, 111, 203, 76, 251];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "priceNotValid";
      msg: "priceNotValid";
    },
    {
      code: 6001;
      name: "priceTooOld";
      msg: "priceTooOld";
    },
    {
      code: 6002;
      name: "rateZero";
      msg: "rateZero";
    },
    {
      code: 6003;
      name: "invalidParams";
      msg: "invalidParams";
    },
    {
      code: 6004;
      name: "invalidPythSourceMultiplierAndDivisor";
      msg: "invalidPythSourceMultiplierAndDivisor";
    },
    {
      code: 6005;
      name: "invalidSource";
      msg: "invalidSource";
    },
    {
      code: 6006;
      name: "invalidSourcesLength";
      msg: "invalidSourcesLength";
    },
    {
      code: 6007;
      name: "oracleAdminOnlyAuthority";
      msg: "oracleAdminOnlyAuthority";
    },
    {
      code: 6008;
      name: "oracleAdminOnlyAuth";
      msg: "oracleAdminOnlyAuth";
    },
    {
      code: 6009;
      name: "oracleAdminMaxAuthCountReached";
      msg: "oracleAdminMaxAuthCountReached";
    },
    {
      code: 6010;
      name: "oracleAdminInvalidParams";
      msg: "oracleAdminInvalidParams";
    },
    {
      code: 6011;
      name: "oracleNonceMismatch";
      msg: "oracleNonceMismatch";
    },
    {
      code: 6012;
      name: "priceConfidenceNotSufficient";
      msg: "priceConfidenceNotSufficient";
    },
    {
      code: 6013;
      name: "stakePoolNotRefreshed";
      msg: "stakePoolNotRefreshed";
    },
    {
      code: 6014;
      name: "invalidPrice";
      msg: "invalidPrice";
    },
    {
      code: 6015;
      name: "feeTooHigh";
      msg: "feeTooHigh";
    },
    {
      code: 6016;
      name: "redstonePriceOverflow";
      msg: "redstonePriceOverflow";
    },
    {
      code: 6017;
      name: "timestampExpected";
      msg: "timestampExpected";
    },
    {
      code: 6018;
      name: "chainlinkPriceReadError";
      msg: "chainlinkPriceReadError";
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
      name: "logStakePoolHighFeeDetected";
      type: {
        kind: "struct";
        fields: [
          {
            name: "stakePool";
            type: "pubkey";
          },
          {
            name: "epoch";
            type: "u64";
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
      name: "oracleAdmin";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "pubkey";
          },
          {
            name: "auths";
            type: {
              vec: "pubkey";
            };
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
    }
  ];
};
