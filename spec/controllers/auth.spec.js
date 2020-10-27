import { expect } from 'chai';
import { stub, restore } from 'sinon';
import { helpers } from 'faker';

import { mockNext, mockReq, mockUser, res } from './mocks';

import * as bcrypt from 'bcryptjs';
import * as Helpers from '../../src/controllers/helpers';

import { signIn, signUp } from '../../src/controllers/auth';
import chalk from 'chalk';

describe(chalk.yellow('src/controllers/auth'), () => {
  const { username, email, name } = helpers.createCard();

  const req = {
    body: {
      username,
      email,
      password: name,
    },
    ...mockReq,
    userInteractor: {
      newUser: stub().resolves(true),
    },
  };

  context('sign up', () => {
    let buildUserObjectResponseStub;
    let sendStub;
    before(async () => {
      buildUserObjectResponseStub = stub(Helpers, 'buildUserObjectResponse');
      sendStub = stub(Helpers, 'send');
      await signUp(req, res, mockNext);
    });

    after(restore);

    it('called userInteractor.newUser', async () => {
      expect(req.userInteractor.newUser).to.have.been.calledWith({
        username,
        email,
        password: name,
        roles: ['user'],
      });
    });
    it('called buildUserObjectResponseStub', async () => {
      expect(buildUserObjectResponseStub).to.have.been.called;
    });

    it('called send', async () => {
      expect(sendStub).to.have.been.called;
    });
    it('called next', async () => {
      expect(mockNext).to.have.been.called;
    });
  });

  context('unsuccessful signin', () => {
    before(async () => {
      stub(bcrypt.default, 'compareSync').returns(false);
    });

    after(restore);

    it('throws Unauthorized error and passes to next', async () => {
      try {
        await signIn(req, res, mockNext);
      } catch (e) {
        e.should.be.Unauthorized();
        e.should.have.value('message', 'Invalid Password');
        expect(mockNext).to.have.been.calledWith(e);
      }
    });
  });
});
