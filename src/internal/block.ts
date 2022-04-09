import { Block, HardhatEthers } from '../types';

function BlockUtils(ethers: HardhatEthers) {
  const {
    utils: { hexValue },
  } = ethers;

  const isAutomine = (): Promise<boolean> => {
    return ethers.provider.send('hardhat_getAutomine', []);
  };

  const setAutomine = (enabled: boolean): Promise<any> => {
    return ethers.provider.send('evm_setAutomine', [enabled]);
  };

  const setIntervalMining = (ms: number): Promise<any> => {
    return ethers.provider.send('evm_setIntervalMining', [ms]);
  };

  const latest = (): Promise<Block> => {
    return ethers.provider.getBlock('latest');
  };

  const latestBlockNumber = (): Promise<number> => {
    return ethers.provider.getBlockNumber();
  };

  const advanceBlockBy = (n: number, interval: number | string = 60): Promise<any> => {
    return ethers.provider.send('hardhat_mine', [hexValue(n), hexValue(interval)]);
  };

  const advanceBlock = (s: number | string = 60): Promise<any> => {
    return advanceBlockBy(1, s);
  };

  return {
    isAutomine,
    setAutomine,
    latest,
    latestBlockNumber,
    advanceBlockBy,
    advanceBlock,
    setIntervalMining,
  };
}

export default BlockUtils;
