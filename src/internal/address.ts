import { HardhatEthers, BigNumber, Signer } from '../types';

function AddressUtils(ethers: HardhatEthers) {
  const {
    provider,
    BigNumber: BN,
    constants,
    utils: { hexValue, isAddress },
  } = ethers;

  const isValid = (address: string): boolean => isAddress(address);

  const balance = (address: string): Promise<BigNumber> => {
    return provider.getBalance(address);
  };

  const balanceEth = (address: string): Promise<BigNumber> => {
    return balance(address).then(balanceWei => balanceWei.div(constants.WeiPerEther));
  };

  const setBalance = (address: string, balance: number | BigNumber): Promise<boolean> => {
    if (!BN.isBigNumber(balance)) {
      balance = BN.from(balance);
    }
    return provider.send('hardhat_setBalance', [address, hexValue(balance)]);
  };

  const impersonate = async (address: string): Promise<Signer> => {
    await provider.send('hardhat_impersonateAccount', [address]);
    return ethers.getSigner(address);
  };

  const stopImpersonating = (address: string): Promise<boolean> => {
    return provider.send('hardhat_stopImpersonatingAccount', [address]);
  };

  return {
    isValid,
    balance,
    balanceEth,
    setBalance,
    impersonate,
    stopImpersonating,
  };
}

export default AddressUtils;
