import { HardhatEthers, ITestUtils } from './types';
import { AddressUtils, BlockUtils, Constants, TimeUtils } from './internal';

export function TestUtils(ethers: HardhatEthers): ITestUtils {
  return {
    BN: ethers.BigNumber,
    constants: Constants(ethers),
    block: BlockUtils(ethers),
    time: TimeUtils(ethers),
    address: AddressUtils(ethers),
  };
}
