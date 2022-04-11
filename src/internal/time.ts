import { HardhatEthers } from '../types';

function TimeUtils(ethers: HardhatEthers) {
  const { provider } = ethers;

  const latest = (): Promise<number> => provider.getBlock('latest').then(b => b.timestamp);

  const increase = async (sec: number): Promise<number> => {
    const n = parseInt(`${sec}`);
    if (isNaN(n)) {
      throw Error(`Invalid number of seconds argument: ${sec}`);
    }

    const v = await provider.send('evm_increaseTime', [n]).then(parseInt);
    await provider.send('hardhat_mine', []);
    return v;
  };

  const increaseTo = async (timestamp: number): Promise<number> => {
    const n = parseInt(`${timestamp}`);
    if (isNaN(n)) {
      throw Error(`Invalid timestamp argument: ${timestamp}`);
    }

    const v = await provider.send('evm_setNextBlockTimestamp', [timestamp]).then(parseInt);
    await provider.send('hardhat_mine', []);
    return v;
  };

  const duration = {
    minutes: (n: number) => n * 60,
    hours: (n: number) => n * 60 * 60,
    days: (n: number) => n * 60 * 60 * 24,
    weeks: (n: number) => n * 60 * 60 * 24 * 7,
    years: (n: number) => n * 60 * 60 * 24 * 365,
  };

  return {
    latest,
    increase,
    increaseTo,
    duration,
  };
}

export default TimeUtils;
