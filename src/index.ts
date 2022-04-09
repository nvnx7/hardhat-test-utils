import { extendEnvironment } from 'hardhat/config';
import { lazyObject } from 'hardhat/plugins';
import './type-extensions';

extendEnvironment(hre => {
  hre.testUtils = lazyObject(() => {
    const { TestUtils } = require('./TestUtils');
    return TestUtils(hre.ethers);
  });
});
