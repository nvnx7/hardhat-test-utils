import { HardhatEthers } from '../types';

function Constants(ethers: HardhatEthers) {
  return {
    ZERO_ADDRESS: ethers.constants.AddressZero,
    ZERO_BYTES32: ethers.constants.HashZero,
    MAX_UINT256: ethers.constants.MaxUint256,
  };
}

export default Constants;
