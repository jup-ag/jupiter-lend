# Jupiter Lend integration guide

Integration guides, CPI reference code and Anchor IDLs for Jupiter Lend on Solana.

## Guides

### Earn

- SDK [Guide](./docs/earn/sdk.md)
- CPI [Guide](./docs/earn/cpi.md)
- API [Guide](https://developers.jup.ag/docs/lend)

### Borrow

- SDK [Guide](./docs/borrow/sdk.md)
- CPI [Guide](./docs/borrow/cpi.md)

The SDK guides match `@jup-ag/lend` 0.4.0. The CPI guides match the IDLs in [`target/idl`](./target/idl).

## CPI reference code

| File                                                           | Program   | Instructions               |
| -------------------------------------------------------------- | --------- | -------------------------- |
| [`references/earn/deposit.rs`](./references/earn/deposit.rs)   | lending   | `deposit`                  |
| [`references/earn/withdraw.rs`](./references/earn/withdraw.rs) | lending   | `withdraw`                 |
| [`references/borrow/operate.rs`](./references/borrow/operate.rs) | vaults  | `init_position`, `operate` |

The reference files compile against `anchor-lang` 0.31.1.

## Programs

Mainnet program IDs of the `main` market, as recorded in the IDLs:

| Program                     | Address                                       | IDL                                                                        | Version |
| --------------------------- | --------------------------------------------- | -------------------------------------------------------------------------- | ------- |
| `lending`                   | `jup3YeL8QhtSx1e253b2FDvsMNC87fDrgQZivbrndc9` | [lending.json](./target/idl/lending.json)                                  | 0.1.9   |
| `liquidity`                 | `jupeiUmn818Jg1ekPURTpr4mFo29p46vygyykFJ3wZC` | [liquidity.json](./target/idl/liquidity.json)                              | 0.1.9   |
| `lending_reward_rate_model` | `jup7TthsMgcR9Y3L277b8Eo9uboVSmu1utkuXHNUKar` | [lending_reward_rate_model.json](./target/idl/lending_reward_rate_model.json) | 0.1.9   |
| `vaults`                    | `jupr81YtYssSyPt8jbnGuiWon5f6x9TcDEFxYe3Bdzi` | [vaults.json](./target/idl/vaults.json)                                    | 0.1.8   |
| `oracle`                    | `jupnw4B6Eqs7ft6rxpzYLJZYSnrpRgPcr589n5Kv4oc` | [oracle.json](./target/idl/oracle.json)                                    | 0.1.8   |
| `dex`                       | `jupZ4m2GqUCJ5iueMfzQf8khFfH31d4XAQt3RzCT9Vd` | [dex.json](./target/idl/dex.json)                                          | 0.1.8   |
| `flashloan`                 | `jupgfSgfuAXv4B6R2Uxu85Z1qdzgju79s6MfZekN6XS` | [flashloan.json](./target/idl/flashloan.json)                              | 0.1.4   |

The SDK's `market` parameter also selects the `ethena` market. These are separate deployments with their own program IDs. The devnet programs listed in the CPI guides were last deployed in May 2025 and do not match these IDLs.

## Repository layout

- [`docs/`](./docs) - SDK, CPI and API guides
- [`references/`](./references) - Rust CPI reference code
- [`target/idl/`](./target/idl) - Anchor IDLs (JSON)
- [`target/types/`](./target/types) - TypeScript types generated from the IDLs
