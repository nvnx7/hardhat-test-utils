import { HardhatEthers, ITestUtils } from './types';
import { AbiUtils, AddressUtils, BlockUtils, Constants, NetworkUtils, TimeUtils } from './internal';

export function TestUtils(ethers: HardhatEthers): ITestUtils {
  return {
    BN: ethers.BigNumber,
    constants: Constants(ethers),
    block: BlockUtils(ethers),
    time: TimeUtils(ethers),
    address: AddressUtils(ethers),
    network: NetworkUtils(ethers),
    abi: AbiUtils(ethers),
  };
}
