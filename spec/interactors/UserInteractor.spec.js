import { expect } from 'chai';
import { yellow } from 'chalk';

import { stub } from 'sinon';

import { Interactor, UserInteractor } from '../../src/utils/interactors';
import { mockUser } from '../controllers/mocks';

describe(yellow('src/utils/interactors/UserInteractor'), () => {
  let user;

  before(async () => {
    user = new UserInteractor();
    user.sequelize.transaction = stub();
    user.User = {
      ...mockUser,
    };
  });

  it('is instance of interactor', () => {
    expect(user).to.be.an.instanceof(Interactor);
  });

  context('checkUsernameExists', () => {
    before(async () => {
      await user.checkUsernameExists('test');
    });

    it('checkUsernameExists calls sequelize.transaction', async () => {
      expect(user.sequelize.transaction).to.have.been.called;
    });

    it('checkUsernameExists alls sequelize.transaction with function', async () => {
      expect(typeof user.sequelize.transaction.args[0][0]).to.equal('function');
    });
  });
});
