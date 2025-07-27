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
      name: "init";
      discriminator: [220, 59, 207, 236, 108, 250, 47, 100];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "oracleAdmin";
          writable: true;
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
      name: "updateAuths";
      discriminator: [93, 96, 178, 156, 57, 117, 253, 209];
      accounts: [
        {
          name: "authority";
          writable: true;
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
      name: "rateZero";
      msg: "rateZero";
    },
    {
      code: 6002;
      name: "invalidParams";
      msg: "invalidParams";
    },
    {
      code: 6003;
      name: "invalidSource";
      msg: "invalidSource";
    },
    {
      code: 6004;
      name: "invalidSourcesLength";
      msg: "invalidSourcesLength";
    },
    {
      code: 6005;
      name: "oracleAdminOnlyAuthority";
      msg: "oracleAdminOnlyAuthority";
    },
    {
      code: 6006;
      name: "oracleAdminOnlyAuth";
      msg: "oracleAdminOnlyAuth";
    },
    {
      code: 6007;
      name: "oracleAdminMaxAuthCountReached";
      msg: "oracleAdminMaxAuthCountReached";
    },
    {
      code: 6008;
      name: "oracleAdminInvalidParams";
      msg: "oracleAdminInvalidParams";
    },
    {
      code: 6009;
      name: "oracleNonceMismatch";
      msg: "oracleNonceMismatch";
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
