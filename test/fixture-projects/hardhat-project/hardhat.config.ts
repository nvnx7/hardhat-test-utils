import { HardhatUserConfig } from 'hardhat/types';
import '@nomiclabs/hardhat-ethers';

import '../../../src/index';

const config: HardhatUserConfig = {
  solidity: '0.8.13',
};

export default config;
