import { expect } from 'chai';
import { useEnvironment } from './helpers';

describe('abi', function () {
  useEnvironment('hardhat-project');

  describe('Encoding', function () {
    beforeEach(async function () {
      const ethers = this.hre.ethers;
      this.box = await (await ethers.getContractFactory('Box')).deploy();
    });

    it('encodes function signature', function () {
      const abi = this.hre.testUtils.abi;

      const signature = abi.encodeFunctionSignature('setValue(uint256)');

      expect(signature).to.equal(this.box.interface.getSighash('setValue(uint256)'));
    });

    it('encodes function call', function () {
      const abi = this.hre.testUtils.abi;

      const callEnc = abi.encodeFunctionCall('setValue(uint256)', [9]);

      expect(callEnc).to.equal(this.box.interface.encodeFunctionData('setValue(uint256)', [9]));
    });
  });
});
