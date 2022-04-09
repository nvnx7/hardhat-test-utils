import 'hardhat/types/config';
import 'hardhat/types/runtime';
import '@nomiclabs/hardhat-ethers';
import { ITestUtils } from './types';

declare module 'hardhat/types/runtime' {
  export interface HardhatRuntimeEnvironment {
    testUtils: ITestUtils;
  }
}
