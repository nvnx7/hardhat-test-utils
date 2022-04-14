# hardhat-test-utils 🛠

[![Node.js CI](https://github.com/theNvN/hardhat-test-utils/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/theNvN/hardhat-test-utils/actions/workflows/ci.yml)

Handy utilities for testing contracts in [Hardhat](https://hardhat.org) projects.

## What

This plugin provides a set of various utility functions for testing solidity smart contracts that in a [Hardhat](https://hardhat.org) project.

Check [Usage](#usage) or [API](#api) section for more details.

## Installation

Install with:

**npm**:

```bash
npm install --save-dev hardhat-test-utils hardhat ethers @nomiclabs/hardhat-ethers
```

or, **yarn**:

```bash
yarn add -D hardhat-test-utils hardhat ethers @nomiclabs/hardhat-ethers
```

Import the plugin in your `hardhat.config.js`:

```js
require('hardhat-test-utils');
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import 'hardhat-test-utils';
```

## Required plugins

- [@nomiclabs/hardhat-ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html)

## Tasks

This plugin creates no additional tasks.

## Environment extensions

This plugin adds `testUtils` object to Hardhat Runtime Environment. This object exposes following properties to manipulate corresponding aspects:

- [🧱 block](#block-🧱): Block related utilities.
- [⏳ time](#time-⏳): Time related utilities.
- [📃 address](#address-📃): Address related utilities.
- [⛓️ network](#network-⛓️): Network related utilities.
- [🔩 constants](#constants-🔩): Common constants.
- [1️⃣ BN](#bn-1️⃣): Shorthand for ethers [`BigNumber`](https://docs.ethers.io/v5/api/utils/bignumber/#BigNumber) object.

See [API](#api).

## Usage

There are no additional steps you need to take for this plugin to work.

Install it and access `testUtils` through the Hardhat Runtime Environment anywhere
you need it (tasks, scripts, tests, etc). For example:

```js
const { testUtils } = require('hardhat');

const { time, address, constants } = testUtils;

describe('my tests', function () {
  it('simulates passing of time', async function () {
    const oneHourInSeconds = time.duration.hours(1);
    await time.increase(oneHourInSeconds);
  });

  it('sets the balance of an address', async function () {
    const userAddr = '0x....';
    const newBalance = constants.WEI_PER_ETHER; // 1 ether
    await address.setBalance(userAddr, newBalance);
  });
});
```

## API

The `testUtils` objects exposes following properties with methods:

### `block` 🧱

Exposes methods to manipulate blocks.

```js
const { block } = testUtils;
```

---

#### `block.getAutomine()`

Returns true if automatic mining is enabled, and false otherwise. See [Mining Modes](https://hardhat.org/hardhat-network/explanation/mining-modes.html) to learn more.

##### Params

None

##### Returns

`<Promise<boolean>>`: `true` if automatic mining is enabled, and `false` otherwise.

---

#### `block.setAutomine(enabled: boolean)`

Sets automatic mining mode. See [Mining Modes](https://hardhat.org/hardhat-network/explanation/mining-modes.html) to learn more.

##### Params

- `enabled: boolean`: `true` to enable automatic mining, `false` to disable it.

##### Returns

`<Promise<boolean>>`: Result of the rpc call.

---

#### `block.setIntervalMine(interval: number | BigNumber)`

Enables (with a numeric argument greater than 0) or disables (with a numeric argument equal to 0), the automatic mining of blocks at a regular interval of milliseconds, each of which will include all pending transactions. See also [Mining Modes](https://hardhat.org/hardhat-network/explanation/mining-modes.html).

##### Params

- `interval: number | BigNumber`: Interval in milliseconds.

##### Returns

`<Promise<boolean>>`: Result of the rpc call.

---

#### `block.latest()`

Returns the latest block information. This is same as calling `provider.getBlock('latest')` with [ethers](https://docs.ethers.io/v5/api/providers/provider/#Provider-getBlock).

##### Params

None

##### Returns

`<Promise<Block>>`: Latest block information.

---

#### `block.latestBlockNumber()`

Returns the latest block number. This is same as calling `provider.getBlockNumber()` with [ethers](https://docs.ethers.io/v5/api/providers/provider/#Provider-getBlockNumber).

##### Params

None

##### Returns

`<Promise<number>>`: Latest block number.

---

#### `block.advance(n: number | BigNumber = 1, interval: number | BigNumber = 1)`

Forces `n` number of blocks to be mined, incrementing the block height by `n`.

##### Params

- `n: number | BigNumber`: Number of blocks to mine. Defaults to `1`.
- `interval: number | BigNumber`: Interval between the timestamps of each block, in seconds. Defaults to `1`.

##### Returns

`<Promise<boolean>>`: Result of the rpc call.

**NOTE**: This method can mine any number of blocks at once, in constant time. It exhibits the same performance no matter how many blocks are mined.

---

#### `block.advanceTo(target: number | BigNumber, interval: number | BigNumber = 1)`

Forces blocks to be mined until the `target` height` is reached.

##### Params

- `target: number | BigNumber`: Target block height.
- `interval: number | BigNumber`: Interval between the timestamps of each block, in seconds. Defaults to `1`.

##### Returns

`<Promise<boolean>>`: Result of the rpc call.

---

---

### `time` ⏳ 

Simulates passing of time.

```js
const { time } = testUtils;
```

---

#### `time.latest()`

Gets the latest block timestamp.

##### Params

None

##### Returns

`<Promise<number>>`: Latest block timestamp.

---

#### `time.increase(duration: number | BigNumber)`

Increases blockchain's time by `duration` seconds and mines a new block.

##### Params

- `duration: number | BigNumber`: Number of seconds to increase the time by.

##### Returns

`<Promise<number>>`: Total time adjustment, in seconds.

---

#### `time.increaseTo(target: number | BigNumber)`

Same as `time.increase()`, but takes the exact timestamp that you want in the next block, and mines that block.

##### Params

- `target: number | BigNumber`: Target timestamp for the newly mined block.

##### Returns

`<Promise<number>>`: Total time adjustment, in seconds.

---

#### `time.duration.<unit>(value: number | BigNumber)`

An set of `duration` object methods to convert time units to seconds. For example:

```js
time.duration.minutes(1); // 60
time.duration.hours(1); // 3600
time.duration.days(1); // 86400
time.duration.weeks(1); // 604800
time.duration.years(1); // 31536000
```

Available units are `minutes`, `hours`, `days`, `weeks`, `years`.

##### Params

- `value: number | BigNumber`: Value in a time unit to convert to number of seconds.

##### Returns

`<Promise<number>>`: Number of seconds.

---

---

### `address` 📃

Manipulate addresses.

```js
const { address } = testUtils;
```

---

#### `address.isValid(addr: string)`

Returns true if `addr` is valid ethereum address, false otherwise.

##### Params

- `addr: string`: address to check

##### Returns

`boolean`: true if `addr` is valid ethereum address, false otherwise.

---

#### `address.balance(addr: string)`

Returns balance of given address in wei unit.

##### Params

- `addr: string`: address to fetch balance of.

##### Returns

`<Promise<BigNumber>>`: balance of given address in wei.

---

#### `address.balanceEth(addr: string)`

Returns balance of given address in eth unit.

##### Params

- `addr: string`: address to fetch balance of.

#### Returns

`<Promise<BigNumber>>`: balance of given address in eth.

---

#### `address.setBalance(addr: string, balance: number | BigNumber)`

Modify the balance of given address.

##### Params

- `addr: string`: address to modify balance of.
- `balance: number | BigNumber`: new balance of given address.

##### Returns

`<Promise<boolean>>`: result of the rpc call.

---

#### `address.impersonate(addr: string)`

Impersonate as specific account and contract addresses and returns the corresponding ethers [`Signer`](https://docs.ethers.io/v5/api/signer/#Signer). See [hardhat_impersonateAccount](https://hardhat.org/hardhat-network/reference/#hardhat-impersonateaccount)

##### Params

- `addr: string`: address to impersonate.

##### Returns

`<Promise<Signer>>`: Signer corresponding to impersonated account.

---

#### `address.stopImpersonating(addr: string)`

Stops impersonating an account after having previously used `address.impersonate()`.

##### Params

- `addr: string`: address to stop impersonating.

##### Returns

`<Promise<boolean>>`: result of the rpc call.

---

---

### `network` ⛓️

Blockchain network utilities.

```js
const { network } = testUtils;
```

---

#### `network.snapshot()`

Takes snapshot of current network state.

##### Params

None

##### Returns

`<Promise<string>>`: Snapshot id

---

#### `network.revert(snapshotId: string)`

Reverts the state of network to a previous snapshot.

##### Params

- `snapshotId: string`: Id of snapshot to revert to.

##### Returns

`<Promise<boolean>>`: Result of the rpc call.

---

---

### `constants` 🔩

Some useful constants.

```js
const { constants } = testUtils;
```

---

#### `constants.ZERO_ADDRESS: string`

The zero ethereum address - `0x0000000000000000000000000000000000000000`

---

#### `constants.ZERO_BYTES32: string`

The zero 32 bytes array - `0x0000000000000000000000000000000000000000000000000000000000000000`

---

#### `constants.MAX_UINT256: BigNumber`

The `BigNumber` value representing the maximum `uint256` value.

---

#### `constants.MAX_INT256: BigNumber`

The `BigNumber` value representing the maximum `int256` value.

---

#### `constants.MIN_INT256: BigNumber`

The `BigNumber` value representing the minimum `int256` value.

---

#### `constants.WEI_PER_ETHER: BigNumber`

The `BigNumber` value representing `1000000000000000000`, which is the number of wei per ether.

---

---

### `BN` 1️⃣

Shorthand for ethers [`BigNumber`](https://docs.ethers.io/v5/api/utils/bignumber/#BigNumber) object.
