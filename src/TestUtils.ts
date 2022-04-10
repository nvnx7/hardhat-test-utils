import { HardhatEthers, ITestUtils } from './types';
import { BlockUtils, Constants, TimeUtils } from './internal';

export function TestUtils(ethers: HardhatEthers): ITestUtils {
  return {
    BN: ethers.BigNumber,
    constants: Constants(ethers),
    block: BlockUtils(ethers),
    time: TimeUtils(ethers),
  };
}
