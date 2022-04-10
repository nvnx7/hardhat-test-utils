import type { ethers } from 'ethers';
import type EthersT from 'ethers';
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types';
import type { Constants, BlockUtils, TimeUtils } from '../internal';

export interface ITestUtils {
  BN: typeof EthersT.BigNumber;
  constants: ReturnType<typeof Constants>;
  block: ReturnType<typeof BlockUtils>;
  time: ReturnType<typeof TimeUtils>;
}

export type HardhatEthers = typeof ethers & HardhatEthersHelpers;

export type Block = EthersT.providers.Block;
export type BigNumber = EthersT.BigNumber;
