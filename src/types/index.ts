import type { ethers } from 'ethers';
import type EthersT from 'ethers';
import { HardhatEthersHelpers } from '@nomiclabs/hardhat-ethers/types';
import type { BlockUtils } from '../internal';

export interface ITestUtils {
  block: ReturnType<typeof BlockUtils>;
}

export type HardhatEthers = typeof ethers & HardhatEthersHelpers;

export type Block = EthersT.providers.Block;
export type BigNumber = EthersT.BigNumber;
