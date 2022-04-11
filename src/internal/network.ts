import { HardhatEthers } from '../types';

function NetworkUtils(ethers: HardhatEthers) {
  const { provider } = ethers;

  const snapshot = (): Promise<string> => {
    return provider.send('evm_snapshot', []);
  };

  const revert = (id: string): Promise<boolean> => {
    return provider.send('evm_revert', [id]);
  };

  return {
    snapshot,
    revert,
  };
}

export default NetworkUtils;
