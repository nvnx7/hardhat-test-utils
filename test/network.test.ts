import chai, { expect } from 'chai';
import { solidity } from 'ethereum-waffle';
import { useEnvironment } from './helpers';

chai.use(solidity);

describe.only('network', function () {
  useEnvironment('hardhat-project');

  it('snapshots network state', async function () {
    const network = this.hre.testUtils.network;

    const snapshotId = await network.snapshot();
    expect(snapshotId).to.be.a('string');
  });

  it('reverts network state', async function () {
    const network = this.hre.testUtils.network;
    const ethers = this.hre.ethers;

    const box = await (await ethers.getContractFactory('Box')).deploy();
    const initValue = await box.getValue();
    const snapshotId = await network.snapshot();

    await box.setValue(5);
    expect(await box.getValue()).to.equal(5);

    const reverted = await network.revert(snapshotId);
    expect(reverted).to.be.true;
    expect(await box.getValue()).to.equal(initValue);
  });
});
