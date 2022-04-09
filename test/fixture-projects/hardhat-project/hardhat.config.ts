import { HardhatUserConfig } from 'hardhat/types';
import '@nomiclabs/hardhat-ethers';

import '../../../src/index';

const config: HardhatUserConfig = {
  solidity: '0.7.3',
};

export default config;
