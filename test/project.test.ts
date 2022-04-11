import { expect } from 'chai';

import { useEnvironment } from './helpers';

describe('Integration', function () {
  describe('Hardhat Runtime Environment extension', function () {
    useEnvironment('hardhat-project');
    it('Should add the testUtils field', function () {
      expect(this.hre.testUtils).to.be.have.all.keys(
        'BN',
        'constants',
        'block',
        'time',
        'address',
        'network',
      );
    });
  });
});
