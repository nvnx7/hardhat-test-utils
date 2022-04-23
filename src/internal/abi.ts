import { HardhatEthers } from '../types';

function AbiUtils(ethers: HardhatEthers) {
  const { utils } = ethers;

  const encodeFunctionSignature = (func: string): string => {
    return new utils.Interface([`function ${func}`]).getSighash(func);
  };

  const encodeFunctionCall = (func: string, args: any[]): string => {
    return new utils.Interface([`function ${func}`]).encodeFunctionData(func, args);
  };

  return {
    encodeFunctionSignature,
    encodeFunctionCall,
  };
}

export default AbiUtils;
