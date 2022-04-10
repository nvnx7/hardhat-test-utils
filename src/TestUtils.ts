import { HardhatEthers, ITestUtils } from './types';
import { BlockUtils, TimeUtils } from './internal';

export function TestUtils(ethers: HardhatEthers): ITestUtils {
  return {
    BN: ethers.BigNumber,
    block: BlockUtils(ethers),
    time: TimeUtils(ethers),
  };
}
