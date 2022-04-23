import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import { useEnvironment } from './helpers';

describe('block', function () {
  useEnvironment('hardhat-project');

  describe('Mining', function () {
    it('gets automine config', async function () {
      const block = this.hre.testUtils.block;

      expect(await block.isAutomine()).to.be.a('boolean');
    });

    it('sets automine', async function () {
      const block = this.hre.testUtils.block;

      await block.setAutomine(false);
      expect(await block.isAutomine()).to.equal(false);
      await block.setAutomine(true);
      expect(await block.isAutomine()).to.equal(true);
    });

    it('sets interval mining', async function () {
      const block = this.hre.testUtils.block;
      await block.setAutomine(false);
      expect(await block.setIntervalMining(1000)).to.be.a('boolean');
    });
  });

  describe('Block', function () {
    it('gets latest block', async function () {
      const block = this.hre.testUtils.block;

      expect(await block.latest()).to.be.have.all.keys(
        '_difficulty',
        'baseFeePerGas',
        'difficulty',
        'extraData',
        'gasLimit',
        'gasUsed',
        'hash',
        'miner',
        'nonce',
        'number',
        'parentHash',
        'timestamp',
        'transactions',
      );
    });

    it('gets latest block number', async function () {
      const block = this.hre.testUtils.block;

      const latestBlock = await block.latest();
      expect(await block.latestNumber()).to.equal(latestBlock.number);
    });

    it('advances block by a number', async function () {
      const block = this.hre.testUtils.block;

      const startBlock = await block.latestNumber();
      await block.advance(420);
      expect(await block.latestNumber()).to.equal(startBlock + 420);
    });

    it('advances block', async function () {
      const block = this.hre.testUtils.block;

      const startBlock = await block.latestNumber();
      await block.advance();
      expect(await block.latestNumber()).to.equal(startBlock + 1);
    });

    it('advances block to number', async function () {
      const block = this.hre.testUtils.block;

      const startBlock = await block.latestNumber();
      await block.advanceTo(startBlock + 420);
      expect(await block.latestNumber()).to.equal(startBlock + 420);
    });

    it('throws for past block advance', async function () {
      const block = this.hre.testUtils.block;

      await block.advance(66);
      const latestBlock = await block.latestNumber();
      await expect(block.advanceTo(latestBlock - 1)).to.eventually.be.rejectedWith(Error);
    });
  });
});
