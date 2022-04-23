import type { ethers } from 'ethers';
import type EthersT from 'ethers';
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types';
import type {
  Constants,
  BlockUtils,
  TimeUtils,
  AddressUtils,
  NetworkUtils,
  AbiUtils,
} from '../internal';

export interface ITestUtils {
  BN: typeof EthersT.BigNumber;
  constants: ReturnType<typeof Constants>;
  block: ReturnType<typeof BlockUtils>;
  time: ReturnType<typeof TimeUtils>;
  address: ReturnType<typeof AddressUtils>;
  network: ReturnType<typeof NetworkUtils>;
  abi: ReturnType<typeof AbiUtils>;
}

export type HardhatEthers = typeof ethers & HardhatEthersHelpers;
export type Block = EthersT.providers.Block;
export type BigNumber = EthersT.BigNumber;
export type Signer = EthersT.Signer;
