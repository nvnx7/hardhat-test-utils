import { expect } from 'chai';
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
      expect(await block.latestBlockNumber()).to.equal(latestBlock.number);
    });

    it('advances block by', async function () {
      const block = this.hre.testUtils.block;

      const startBlock = await block.latestBlockNumber();
      await block.advanceBlockBy(420);
      expect(await block.latestBlockNumber()).to.equal(startBlock + 420);
    });

    it('advances block', async function () {
      const block = this.hre.testUtils.block;

      const startBlock = await block.latestBlockNumber();
      await block.advanceBlock();
      expect(await block.latestBlockNumber()).to.equal(startBlock + 1);
    });
  });
});
