import chai, { expect } from 'chai';
import { solidity } from 'ethereum-waffle';
import { useEnvironment } from './helpers';

chai.use(solidity);

describe('address', function () {
  useEnvironment('hardhat-project');

  describe('Validation', function () {
    it('validates ethereum address', function () {
      const address = this.hre.testUtils.address;

      const goodAddr = '0xd557a44eD144Bf8A3da34ba058708D1b4bc0686A';
      const badAddrs = [
        '0xd557a44eD144Bf8A3da34ba058708D1b4bc0686',
        '0xd557a44eD144Bf8A3da34ba058708D1b4bc0686A0',
        '0xd557a44eD144Bf8A3da34ba058708D1b4bc0686Z',
        'I like turtles',
      ];

      expect(address.isValid(goodAddr)).to.be.true;
      for (const addr of badAddrs) {
        expect(address.isValid(addr)).to.be.false;
      }
    });
  });

  describe('Balance', function () {
    it('gets balance', async function () {
      const address = this.hre.testUtils.address;

      const [signer] = await this.hre.ethers.getSigners();
      expect(await address.balance(signer.address)).to.equal(await signer.getBalance());
    });

    it('gets eth balance', async function () {
      const address = this.hre.testUtils.address;

      const [signer] = await this.hre.ethers.getSigners();
      const weiPerEth = this.hre.ethers.constants.WeiPerEther;

      expect(await address.balanceEth(signer.address)).to.equal(
        await signer.getBalance().then(b => b.div(weiPerEth)),
      );
    });

    it('sets address balance', async function () {
      const address = this.hre.testUtils.address;

      const [signer] = await this.hre.ethers.getSigners();
      const balance = this.hre.ethers.utils.parseEther('500');

      await address.setBalance(signer.address, balance);

      expect(await address.balance(signer.address)).to.equal(balance);
    });
  });

  describe('Impersonation', function () {
    beforeEach(async function () {
      const ethers = this.hre.ethers;
      this.testContract = await (await ethers.getContractFactory('TestContract')).deploy();
      this.imposter = await this.testContract.imposter();
    });

    it('impersonates signer address', async function () {
      const address = this.hre.testUtils.address;

      await expect(this.testContract.onlyImposter()).to.be.reverted;

      const imposterSigner = await address.impersonate(this.imposter);
      expect(await imposterSigner.getAddress()).to.equal(this.imposter);

      expect(await this.testContract.connect(imposterSigner).onlyImposter()).to.equal(true);
    });

    it.skip('stops impersonating', async function () {
      const address = this.hre.testUtils.address;
    });
  });
});
