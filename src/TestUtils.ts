import { HardhatEthers, ITestUtils } from './types';
import { BlockUtils } from './internal';

export function TestUtils(ethers: HardhatEthers): ITestUtils {
  return {
    block: BlockUtils(ethers),
  };
}
