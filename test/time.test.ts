import chai, { expect } from 'chai';
import { solidity } from 'ethereum-waffle';
import { useEnvironment } from './helpers';

chai.use(solidity);

describe('time', function () {
  useEnvironment('hardhat-project');

  describe('Duration', function () {
    it('converts minutes to seconds', async function () {
      const time = this.hre.testUtils.time;

      expect(time.duration.minutes(5)).to.equal(5 * 60);
    });

    it('converts hours to seconds', async function () {
      const time = this.hre.testUtils.time;

      expect(time.duration.hours(5)).to.equal(60 * 60 * 5);
    });

    it('converts days to seconds', async function () {
      const time = this.hre.testUtils.time;

      expect(time.duration.days(5)).to.equal(5 * 60 * 60 * 24);
    });

    it('converts weeks to seconds', async function () {
      const time = this.hre.testUtils.time;

      expect(time.duration.weeks(5)).to.equal(5 * 60 * 60 * 24 * 7);
    });

    it('converts years to seconds', async function () {
      const time = this.hre.testUtils.time;

      expect(time.duration.years(5)).to.equal(5 * 60 * 60 * 24 * 365);
    });
  });

  describe('Timestamp', function () {
    it('gets latest block timestamp', async function () {
      const time = this.hre.testUtils.time;

      expect(await time.latest()).to.be.equal(
        await this.hre.ethers.provider.getBlock('latest').then(b => b.timestamp),
      );
    });
  });

  describe.only('Time Forward', function () {
    const TOLERANCE_SEC = 2;

    it('increases time', async function () {
      const time = this.hre.testUtils.time;

      const start = await time.latest();
      const adjusted = await time.increase(50);
      const end = await time.latest();

      expect(adjusted).to.be.closeTo(50, TOLERANCE_SEC);
      expect(end).to.be.closeTo(start + 50, TOLERANCE_SEC);
    });

    it('increases time to a future timestamp', async function () {
      const time = this.hre.testUtils.time;

      const oneHour = time.duration.hours(1);

      const start = await time.latest();
      const timestamp = await time.increaseTo(start + oneHour);
      const end = await time.latest();

      expect(end).to.be.closeTo(start + oneHour, TOLERANCE_SEC);
      expect(timestamp).to.be.closeTo(end, TOLERANCE_SEC);
    });
  });
});
