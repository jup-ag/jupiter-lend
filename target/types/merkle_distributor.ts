/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/merkle_distributor.json`.
 */
export type MerkleDistributor = {
  address: "jup9FB8aPL62L8SHwhZJnxnV263qQvc9tseGT6AFLn6";
  metadata: {
    name: "merkleDistributor";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "approveRoot";
      discriminator: [167, 152, 175, 193, 218, 188, 184, 23];
      accounts: [
        {
          name: "approver";
          signer: true;
        },
        {
          name: "merkleAdmin";
        },
        {
          name: "merkleDistributor";
          writable: true;
        },
        {
          name: "approverRole";
        }
      ];
      args: [
        {
          name: "merkleRoot";
          type: {
            array: ["u8", 32];
          };
        },
        {
          name: "cycle";
          type: "u32";
        },
        {
          name: "startSlot";
          type: "u32";
        },
        {
          name: "endSlot";
          type: "u32";
        }
      ];
    },
    {
      name: "claim";
      discriminator: [62, 198, 214, 193, 213, 159, 108, 210];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "merkleDistributor";
          writable: true;
        },
        {
          name: "merkleAdmin";
        },
        {
          name: "mint";
          relations: ["merkleDistributor"];
        },
        {
          name: "claimStatus";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 108, 97, 105, 109];
              },
              {
                kind: "account";
                path: "signer";
              },
              {
                kind: "arg";
                path: "positionId";
              },
              {
                kind: "arg";
                path: "distributorId";
              }
            ];
          };
        },
        {
          name: "vaultTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "merkleAdmin";
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
          name: "recipientTokenAccount";
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
          name: "tokenProgram";
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
          name: "cumulativeAmount";
          type: "u64";
        },
        {
          name: "positionType";
          type: "u8";
        },
        {
          name: "positionId";
          type: "pubkey";
        },
        {
          name: "distributorId";
          type: "u32";
        },
        {
          name: "cycle";
          type: "u32";
        },
        {
          name: "merkleProof";
          type: {
            vec: {
              array: ["u8", 32];
            };
          };
        },
        {
          name: "metadata";
          type: "bytes";
        }
      ];
    },
    {
      name: "distributeRewards";
      discriminator: [97, 6, 227, 255, 124, 165, 3, 148];
      accounts: [
        {
          name: "distributor";
          writable: true;
          signer: true;
          relations: ["merkleDistributor"];
        },
        {
          name: "merkleAdmin";
        },
        {
          name: "merkleDistributor";
          writable: true;
        },
        {
          name: "mint";
          relations: ["merkleDistributor"];
        },
        {
          name: "distributorTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "distributor";
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
          name: "vaultTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "merkleAdmin";
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
          name: "tokenProgram";
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
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "initDistributor";
      discriminator: [4, 170, 72, 1, 58, 177, 150, 43];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "merkleAdmin";
          writable: true;
        },
        {
          name: "merkleDistributor";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [100, 105, 115, 116, 114, 105, 98, 117, 116, 111, 114];
              },
              {
                kind: "account";
                path: "mint";
              },
              {
                kind: "account";
                path: "merkle_admin.next_distributor_id";
                account: "merkleAdmin";
              }
            ];
          };
        },
        {
          name: "mint";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "params";
          type: {
            defined: {
              name: "initializeParams";
            };
          };
        }
      ];
    },
    {
      name: "initMerkleAdmin";
      discriminator: [130, 19, 59, 140, 26, 4, 117, 19];
      accounts: [
        {
          name: "signer";
          writable: true;
          signer: true;
        },
        {
          name: "merkleAdmin";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  109,
                  101,
                  114,
                  107,
                  108,
                  101,
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
        }
      ];
    },
    {
      name: "initRole";
      discriminator: [24, 82, 229, 76, 200, 87, 242, 26];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "merkleAdmin";
        },
        {
          name: "roleAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 111, 108, 101];
              },
              {
                kind: "arg";
                path: "address";
              },
              {
                kind: "arg";
                path: "role";
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
          name: "address";
          type: "pubkey";
        },
        {
          name: "role";
          type: "u8";
        }
      ];
    },
    {
      name: "pause";
      discriminator: [211, 22, 221, 251, 74, 121, 193, 47];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "merkleAdmin";
        },
        {
          name: "merkleDistributor";
          writable: true;
        }
      ];
      args: [];
    },
    {
      name: "proposeRoot";
      discriminator: [132, 0, 76, 107, 236, 86, 118, 165];
      accounts: [
        {
          name: "proposer";
          signer: true;
        },
        {
          name: "merkleAdmin";
        },
        {
          name: "merkleDistributor";
          writable: true;
        },
        {
          name: "proposerRole";
        }
      ];
      args: [
        {
          name: "merkleRoot";
          type: {
            array: ["u8", 32];
          };
        },
        {
          name: "cycle";
          type: "u32";
        },
        {
          name: "startSlot";
          type: "u32";
        },
        {
          name: "endSlot";
          type: "u32";
        }
      ];
    },
    {
      name: "setStartBlockOfNextCycle";
      discriminator: [168, 83, 36, 171, 34, 95, 238, 81];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "merkleAdmin";
        },
        {
          name: "merkleDistributor";
          writable: true;
        }
      ];
      args: [
        {
          name: "startBlockOfNextCycle";
          type: "u32";
        }
      ];
    },
    {
      name: "unpause";
      discriminator: [169, 144, 4, 38, 10, 141, 188, 255];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "merkleAdmin";
        },
        {
          name: "merkleDistributor";
          writable: true;
        }
      ];
      args: [];
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
          name: "merkleAdmin";
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
          name: "merkleAdmin";
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
      name: "updateDistributionConfig";
      discriminator: [162, 95, 24, 240, 144, 247, 117, 22];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "merkleAdmin";
        },
        {
          name: "merkleDistributor";
          writable: true;
        }
      ];
      args: [
        {
          name: "pullFromDistributor";
          type: "bool";
        },
        {
          name: "blocksPerDistribution";
          type: "u32";
        },
        {
          name: "cyclesPerDistribution";
          type: "u32";
        }
      ];
    },
    {
      name: "updateRewardsDistributor";
      discriminator: [250, 201, 40, 213, 158, 61, 253, 147];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "merkleAdmin";
        },
        {
          name: "merkleDistributor";
          writable: true;
        }
      ];
      args: [
        {
          name: "distributor";
          type: "pubkey";
        }
      ];
    },
    {
      name: "updateRole";
      discriminator: [36, 223, 162, 98, 168, 209, 75, 151];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "merkleAdmin";
        },
        {
          name: "roleAccount";
          writable: true;
        }
      ];
      args: [
        {
          name: "turnOff";
          type: "bool";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "claimStatus";
      discriminator: [22, 183, 249, 157, 247, 95, 150, 96];
    },
    {
      name: "merkleAdmin";
      discriminator: [0, 192, 185, 207, 98, 65, 4, 187];
    },
    {
      name: "merkleDistributor";
      discriminator: [77, 119, 139, 70, 84, 247, 12, 26];
    },
    {
      name: "roleAccount";
      discriminator: [142, 236, 135, 197, 214, 3, 244, 226];
    }
  ];
  events: [
    {
      name: "logClaimed";
      discriminator: [215, 10, 98, 242, 67, 30, 230, 185];
    },
    {
      name: "logDistribution";
      discriminator: [122, 162, 17, 219, 57, 67, 93, 50];
    },
    {
      name: "logDistributionConfigUpdated";
      discriminator: [64, 108, 152, 215, 83, 217, 187, 190];
    },
    {
      name: "logInitRole";
      discriminator: [14, 236, 197, 243, 241, 106, 70, 162];
    },
    {
      name: "logRewardsDistributorUpdated";
      discriminator: [222, 161, 225, 24, 234, 122, 115, 38];
    },
    {
      name: "logRootProposed";
      discriminator: [241, 45, 0, 250, 225, 243, 158, 34];
    },
    {
      name: "logRootUpdated";
      discriminator: [79, 2, 209, 136, 63, 82, 145, 211];
    },
    {
      name: "logStartBlockOfNextCycleUpdated";
      discriminator: [46, 130, 115, 115, 242, 191, 9, 226];
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
      name: "logUpdateRole";
      discriminator: [138, 23, 252, 139, 73, 226, 226, 166];
    },
    {
      name: "paused";
      discriminator: [172, 248, 5, 253, 49, 255, 255, 232];
    },
    {
      name: "unpaused";
      discriminator: [156, 150, 47, 174, 120, 216, 93, 117];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "invalidParams";
      msg: "invalidParams";
    },
    {
      code: 6001;
      name: "unauthorized";
      msg: "unauthorized";
    },
    {
      code: 6002;
      name: "rewardsPaused";
      msg: "rewardsPaused";
    },
    {
      code: 6003;
      name: "invalidCycle";
      msg: "invalidCycle";
    },
    {
      code: 6004;
      name: "invalidProof";
      msg: "invalidProof";
    },
    {
      code: 6005;
      name: "nothingToClaim";
      msg: "nothingToClaim";
    },
    {
      code: 6006;
      name: "maxAuthCountReached";
      msg: "maxAuthCountReached";
    },
    {
      code: 6007;
      name: "invalidDistributor";
      msg: "invalidDistributor";
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
      name: "claimStatus";
      type: {
        kind: "struct";
        fields: [
          {
            name: "distributorId";
            type: "u32";
          },
          {
            name: "recipient";
            type: "pubkey";
          },
          {
            name: "positionId";
            type: "pubkey";
          },
          {
            name: "positionType";
            type: "u8";
          },
          {
            name: "claimedAmount";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "initializeParams";
      type: {
        kind: "struct";
        fields: [
          {
            name: "distributionInHours";
            type: "u64";
          },
          {
            name: "cycleInHours";
            type: "u64";
          },
          {
            name: "startBlock";
            type: "u32";
          },
          {
            name: "pullFromDistributor";
            type: "bool";
          },
          {
            name: "vestingTime";
            type: "u32";
          },
          {
            name: "vestingStartTime";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "logClaimed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "distributorId";
            type: "u32";
          },
          {
            name: "user";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "cycle";
            type: "u32";
          },
          {
            name: "positionType";
            type: "u8";
          },
          {
            name: "positionId";
            type: "pubkey";
          },
          {
            name: "timestamp";
            type: "u32";
          },
          {
            name: "blockNumber";
            type: "u64";
          }
        ];
      };
    },
    {
      name: "logDistribution";
      type: {
        kind: "struct";
        fields: [
          {
            name: "distributorId";
            type: "u32";
          },
          {
            name: "epoch";
            type: "u32";
          },
          {
            name: "distributor";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "startCycle";
            type: "u32";
          },
          {
            name: "endCycle";
            type: "u32";
          },
          {
            name: "registrationBlock";
            type: "u32";
          },
          {
            name: "registrationTimestamp";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "logDistributionConfigUpdated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "distributorId";
            type: "u32";
          },
          {
            name: "pullFromDistributor";
            type: "bool";
          },
          {
            name: "blocksPerDistribution";
            type: "u32";
          },
          {
            name: "cyclesPerDistribution";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "logInitRole";
      type: {
        kind: "struct";
        fields: [
          {
            name: "address";
            type: "pubkey";
          },
          {
            name: "role";
            type: {
              defined: {
                name: "roleType";
              };
            };
          }
        ];
      };
    },
    {
      name: "logRewardsDistributorUpdated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "distributorId";
            type: "u32";
          },
          {
            name: "distributor";
            type: "pubkey";
          }
        ];
      };
    },
    {
      name: "logRootProposed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "distributorId";
            type: "u32";
          },
          {
            name: "cycle";
            type: "u32";
          },
          {
            name: "merkleRoot";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "timestamp";
            type: "u32";
          },
          {
            name: "publishBlock";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "logRootUpdated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "distributorId";
            type: "u32";
          },
          {
            name: "cycle";
            type: "u32";
          },
          {
            name: "merkleRoot";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "timestamp";
            type: "u32";
          },
          {
            name: "publishBlock";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "logStartBlockOfNextCycleUpdated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "distributorId";
            type: "u32";
          },
          {
            name: "startBlockOfNextCycle";
            type: "u32";
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
      name: "logUpdateRole";
      type: {
        kind: "struct";
        fields: [
          {
            name: "address";
            type: "pubkey";
          },
          {
            name: "role";
            type: {
              defined: {
                name: "roleType";
              };
            };
          }
        ];
      };
    },
    {
      name: "merkleAdmin";
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
          },
          {
            name: "nextDistributorId";
            type: "u32";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "merkleCycle";
      repr: {
        kind: "c";
      };
      type: {
        kind: "struct";
        fields: [
          {
            name: "merkleRoot";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "cycle";
            type: "u32";
          },
          {
            name: "timestamp";
            type: "u32";
          },
          {
            name: "publishBlock";
            type: "u32";
          },
          {
            name: "startSlot";
            type: "u32";
          },
          {
            name: "endSlot";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "merkleDistributor";
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
            name: "distributorId";
            type: "u32";
          },
          {
            name: "paused";
            type: "u8";
          },
          {
            name: "distributor";
            type: "pubkey";
          },
          {
            name: "currentMerkleCycle";
            type: {
              defined: {
                name: "merkleCycle";
              };
            };
          },
          {
            name: "pendingMerkleCycle";
            type: {
              defined: {
                name: "merkleCycle";
              };
            };
          },
          {
            name: "previousMerkleRoot";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "cyclesPerDistribution";
            type: "u32";
          },
          {
            name: "blocksPerDistribution";
            type: "u32";
          },
          {
            name: "startBlockOfNextCycle";
            type: "u32";
          },
          {
            name: "endBlockOfLastCycle";
            type: "u32";
          },
          {
            name: "pullFromDistributor";
            type: "u8";
          },
          {
            name: "vestingTime";
            type: "u32";
          },
          {
            name: "vestingStartTime";
            type: "u32";
          },
          {
            name: "totalRewardsCycles";
            type: "u32";
          },
          {
            name: "totalDistributions";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "paused";
      type: {
        kind: "struct";
        fields: [
          {
            name: "distributorId";
            type: "u32";
          }
        ];
      };
    },
    {
      name: "roleAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "address";
            type: "pubkey";
          },
          {
            name: "role";
            type: "u8";
          },
          {
            name: "active";
            type: "bool";
          }
        ];
      };
    },
    {
      name: "roleType";
      type: {
        kind: "enum";
        variants: [
          {
            name: "none";
          },
          {
            name: "proposer";
          },
          {
            name: "approver";
          }
        ];
      };
    },
    {
      name: "unpaused";
      type: {
        kind: "struct";
        fields: [
          {
            name: "distributorId";
            type: "u32";
          }
        ];
      };
    }
  ];
};
