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
    version: "0.1.3";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "chainlinkDataStreamsFeedAccessController";
      discriminator: [181, 88, 179, 151, 225, 38, 9, 6];
      accounts: [
        {
          name: "authority";
          signer: true;
        },
        {
          name: "chainlinkDsCache";
          writable: true;
        },
      ];
      args: [
        {
          name: "suspend";
          type: "bool";
        },
      ];
    },
    {
      name: "getBothExchangeRate";
      discriminator: [92, 88, 161, 46, 230, 193, 46, 237];
      accounts: [
        {
          name: "oracle";
        },
      ];
      args: [
        {
          name: "nonce";
          type: "u16";
        },
      ];
    },
    {
      name: "getExchangeRate";
      discriminator: [153, 76, 17, 194, 170, 215, 89, 142];
      accounts: [
        {
          name: "oracle";
        },
      ];
      args: [
        {
          name: "nonce";
          type: "u16";
        },
      ];
      returns: "u128";
    },
    {
      name: "getExchangeRateLiquidate";
      discriminator: [228, 169, 73, 39, 91, 82, 27, 5];
      accounts: [
        {
          name: "oracle";
        },
      ];
      args: [
        {
          name: "nonce";
          type: "u16";
        },
      ];
      returns: "u128";
    },
    {
      name: "getExchangeRateOperate";
      discriminator: [174, 166, 126, 10, 122, 153, 94, 203];
      accounts: [
        {
          name: "oracle";
        },
      ];
      args: [
        {
          name: "nonce";
          type: "u16";
        },
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
          name: "authority";
          type: "pubkey";
        },
      ];
    },
    {
      name: "initChainlinkDataStreamsCache";
      discriminator: [47, 174, 206, 189, 94, 253, 25, 233];
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
          name: "chainlinkDsCache";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  104,
                  97,
                  105,
                  110,
                  108,
                  105,
                  110,
                  107,
                  95,
                  100,
                  115,
                ];
              },
              {
                kind: "arg";
                path: "nonce";
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
          name: "nonce";
          type: "u16";
        },
        {
          name: "feeds";
          type: {
            vec: {
              defined: {
                name: "feedEntry";
              };
            };
          };
        },
        {
          name: "keepers";
          type: {
            vec: "pubkey";
          };
        },
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
        },
      ];
    },
    {
      name: "refreshPriceFeedWithChainlink";
      discriminator: [74, 3, 0, 183, 242, 117, 152, 203];
      accounts: [
        {
          name: "signer";
          signer: true;
        },
        {
          name: "chainlinkDsCache";
          writable: true;
        },
        {
          name: "verifierAccount";
          address: "HJR45sRiFdGncL69HVzRK4HLS2SXcVW3KeTPkp2aFmWC";
        },
        {
          name: "accessController";
          address: "7mSn5MoBjyRLKoJShgkep8J17ueGG8rYioVAiSg5YWMF";
        },
        {
          name: "configAccount";
        },
        {
          name: "verifierProgramId";
          address: "Gt9S41PtjR58CbG9JhJ3J6vxesqrNAswbWYbLNTMZA3c";
        },
      ];
      args: [
        {
          name: "feedId";
          type: {
            array: ["u8", 32];
          };
        },
        {
          name: "serializedReport";
          type: "bytes";
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
          name: "oracleAdmin";
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
          name: "oracleAdmin";
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
      name: "updateChainlinkDataStreamsCacheFeeds";
      discriminator: [55, 69, 93, 203, 144, 30, 248, 173];
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
          name: "chainlinkDsCache";
          writable: true;
        },
      ];
      args: [
        {
          name: "feeds";
          type: {
            vec: {
              defined: {
                name: "feedEntry";
              };
            };
          };
        },
      ];
    },
    {
      name: "updateChainlinkDataStreamsCacheKeepers";
      discriminator: [125, 168, 188, 187, 148, 203, 102, 87];
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
          name: "chainlinkDsCache";
          writable: true;
        },
      ];
      args: [
        {
          name: "keeperStatus";
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
  ];
  accounts: [
    {
      name: "chainlinkDataStreamsCache";
      discriminator: [65, 102, 75, 47, 79, 156, 109, 193];
    },
    {
      name: "oracle";
      discriminator: [139, 194, 131, 179, 140, 179, 229, 244];
    },
    {
      name: "oracleAdmin";
      discriminator: [239, 232, 8, 20, 254, 63, 25, 246];
    },
  ];
  events: [
    {
      name: "logChainlinkDataStreamsFeedMarketIsInTransition";
      discriminator: [211, 67, 128, 58, 147, 192, 179, 111];
    },
    {
      name: "logChainlinkDataStreamsFeedSuspended";
      discriminator: [63, 149, 247, 255, 189, 80, 154, 253];
    },
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
    },
    {
      name: "logUpdateCacheFeeds";
      discriminator: [75, 155, 134, 56, 17, 94, 235, 191];
    },
    {
      name: "logUpdateCacheKeepers";
      discriminator: [33, 129, 191, 130, 117, 119, 198, 235];
    },
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
      name: "cpiToStakeProgramFailed";
      msg: "cpiToStakeProgramFailed";
    },
    {
      code: 6019;
      name: "invalidStakePoolReturnParams";
      msg: "invalidStakePoolReturnParams";
    },
    {
      code: 6020;
      name: "chainlinkPriceReadError";
      msg: "chainlinkPriceReadError";
    },
    {
      code: 6021;
      name: "singlePoolTokenSupplyZero";
      msg: "singlePoolTokenSupplyZero";
    },
    {
      code: 6022;
      name: "singlePoolInvalidStakeAccount";
      msg: "singlePoolInvalidStakeAccount";
    },
    {
      code: 6023;
      name: "singlePoolInvalidMint";
      msg: "singlePoolInvalidMint";
    },
    {
      code: 6024;
      name: "jupLendAccountMismatch";
      msg: "jupLendAccountMismatch";
    },
    {
      code: 6025;
      name: "chainlinkDataStreamsNoReportData";
      msg: "chainlinkDataStreamsNoReportData";
    },
    {
      code: 6026;
      name: "chainlinkDataStreamsInvalidReport";
      msg: "chainlinkDataStreamsInvalidReport";
    },
    {
      code: 6027;
      name: "chainlinkDataStreamsFeedIdMismatch";
      msg: "chainlinkDataStreamsFeedIdMismatch";
    },
    {
      code: 6028;
      name: "chainlinkDataStreamsInvalidReportType";
      msg: "chainlinkDataStreamsInvalidReportType";
    },
    {
      code: 6029;
      name: "chainlinkDataStreamsFeedSuspended";
      msg: "chainlinkDataStreamsFeedSuspended";
    },
    {
      code: 6030;
      name: "chainlinkDataStreamsFeedAlreadySuspendedOrResumed";
      msg: "chainlinkDataStreamsFeedAlreadySuspendedOrResumed";
    },
    {
      code: 6031;
      name: "chainlinkDataStreamsNotAKeeper";
      msg: "chainlinkDataStreamsNotAKeeper";
    },
    {
      code: 6032;
      name: "chainlinkDataStreamsMaxFeedKeeperCountReached";
      msg: "chainlinkDataStreamsMaxFeedKeeperCountReached";
    },
    {
      code: 6033;
      name: "chainlinkDataStreamsMarketStatusUnknown";
      msg: "chainlinkDataStreamsMarketStatusUnknown";
    },
    {
      code: 6034;
      name: "chainlinkDataStreamsPriceTooOld";
      msg: "chainlinkDataStreamsPriceTooOld";
    },
    {
      code: 6035;
      name: "chainlinkDataStreamsV10PriceNotAllowed";
      msg: "chainlinkDataStreamsV10PriceNotAllowed";
    },
    {
      code: 6036;
      name: "chainlinkDataStreamsMultipleV10Feeds";
      msg: "chainlinkDataStreamsMultipleV10Feeds";
    },
    {
      code: 6037;
      name: "chainlinkDataStreamsV11FeedRequiresV10Feed";
      msg: "chainlinkDataStreamsV11FeedRequiresV10Feed";
    },
    {
      code: 6038;
      name: "chainlinkDataStreamsAllowedFeedNotFound";
      msg: "chainlinkDataStreamsAllowedFeedNotFound";
    },
    {
      code: 6039;
      name: "chainlinkDataStreamsMarketStatusNotSupportedByFeed";
      msg: "chainlinkDataStreamsMarketStatusNotSupportedByFeed";
    },
    {
      code: 6040;
      name: "chainlinkDataStreamsObservationTimestampTooOld";
      msg: "chainlinkDataStreamsObservationTimestampTooOld";
    },
    {
      code: 6041;
      name: "chainlinkDataStreamsFeedIdZero";
      msg: "chainlinkDataStreamsFeedIdZero";
    },
    {
      code: 6042;
      name: "chainlinkDataStreamsDuplicateFeedIdReportType";
      msg: "chainlinkDataStreamsDuplicateFeedIdReportType";
    },
    {
      code: 6043;
      name: "chainlinkDataStreamsDuplicateFeedId";
      msg: "chainlinkDataStreamsDuplicateFeedId";
    },
    {
      code: 6044;
      name: "chainlinkDataStreamsNoFeedKeepers";
      msg: "chainlinkDataStreamsNoFeedKeepers";
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
      name: "chainlinkDataStreamsCache";
      type: {
        kind: "struct";
        fields: [
          {
            name: "nonce";
            type: "u16";
          },
          {
            name: "feeds";
            type: {
              vec: {
                defined: {
                  name: "feedEntry";
                };
              };
            };
          },
          {
            name: "price";
            type: "u128";
          },
          {
            name: "lastUpdateTimestampPrice";
            type: "u64";
          },
          {
            name: "lastUpdateTimestampMultiplier";
            type: "u64";
          },
          {
            name: "lastObservationsTimestamp";
            type: "u64";
          },
          {
            name: "genericData";
            type: {
              defined: {
                name: "chainlinkDsCacheGenericData";
              };
            };
          },
          {
            name: "keepers";
            type: {
              vec: "pubkey";
            };
          },
        ];
      };
    },
    {
      name: "chainlinkDsCacheGenericData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "xstocksActivationDateTime";
            type: "u64";
          },
          {
            name: "xstocksSuspended";
            type: "bool";
          },
          {
            name: "marketStatus";
            docs: [
              "Last market status observed from the most recent report (0 = not yet seen / Unknown).",
              "Set directly from the report's market_status field on every cache refresh.",
              "For V8/V10 feeds this maps to ReportDataMarketStatus; for V11 to ReportDataV11MarketStatus.",
            ];
            type: "u32";
          },
          {
            name: "v11TransitionTimestampS";
            type: "u64";
          },
          {
            name: "xstocksLastMultiplier";
            docs: [
              "Last current_multiplier seen for this feed via a v10 report.",
            ];
            type: "u128";
          },
          {
            name: "xstocksLastObservationsTimestampMultiplierS";
            docs: [
              "`observations_timestamp` (seconds) from the last accepted V10 report.",
              "Enforces strictly-monotonic sequencing to prevent replay of old multiplier reports.",
            ];
            type: "u64";
          },
          {
            name: "padding";
            type: {
              array: ["u8", 24];
            };
          },
        ];
      };
    },
    {
      name: "chainlinkReportType";
      repr: {
        kind: "rust";
      };
      type: {
        kind: "enum";
        variants: [
          {
            name: "xStocks";
          },
          {
            name: "rwa";
          },
          {
            name: "nav";
          },
          {
            name: "rwaAdvanced";
          },
          {
            name: "exchangeRate";
          },
          {
            name: "cryptoPrice";
          },
        ];
      };
    },
    {
      name: "feedEntry";
      docs: [
        "One entry in the feed map: a 32-byte Chainlink feed ID paired with its report schema",
        "type and, for V11 feeds, the set of trading sessions the feed supports.",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "feedId";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "reportType";
            type: {
              defined: {
                name: "chainlinkReportType";
              };
            };
          },
          {
            name: "v11SessionType";
            type: {
              defined: {
                name: "v11FeedSessionType";
              };
            };
          },
        ];
      };
    },
    {
      name: "logChainlinkDataStreamsFeedMarketIsInTransition";
      type: {
        kind: "struct";
        fields: [
          {
            name: "feedId";
            type: {
              array: ["u8", 32];
            };
          },
          {
            name: "v11TransitionTimestampS";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "logChainlinkDataStreamsFeedSuspended";
      type: {
        kind: "struct";
        fields: [
          {
            name: "chainlinkDataStreamsCache";
            type: "pubkey";
          },
          {
            name: "keeper";
            type: "pubkey";
          },
          {
            name: "xstocksSuspended";
            type: "bool";
          },
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
      name: "logUpdateCacheFeeds";
      type: {
        kind: "struct";
        fields: [
          {
            name: "chainlinkDataStreamsCache";
            type: "pubkey";
          },
          {
            name: "feeds";
            type: {
              vec: {
                defined: {
                  name: "feedEntry";
                };
              };
            };
          },
        ];
      };
    },
    {
      name: "logUpdateCacheKeepers";
      type: {
        kind: "struct";
        fields: [
          {
            name: "chainlinkDataStreamsCache";
            type: "pubkey";
          },
          {
            name: "keeperStatus";
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
      name: "v11FeedSessionType";
      docs: [
        "Trading-session scope for a V11 (24/5 US Equities) feed.",
        "",
        "Chainlink publishes a `market_status` field in every v11 report that indicates which",
        "trading phase is currently active. This is done here because even when market is not",
        "in session chainlink feeds can public other sessions data.",
        "This enum captures which phases are valid for a given feed so that reports arriving",
        "with an unsupported status can be rejected early rather than silently accepted.",
        "",
        "For non-V11 feed entries (`report_type != RWAAdvanced`) this field is ignored.",
      ];
      repr: {
        kind: "rust";
      };
      type: {
        kind: "enum";
        variants: [
          {
            name: "regular";
          },
          {
            name: "extended";
          },
          {
            name: "overnight";
          },
        ];
      };
    },
  ];
};
