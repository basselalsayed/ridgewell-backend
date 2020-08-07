import { expect } from 'chai';
import { match, resetHistory, stub } from 'sinon';
import { helpers } from 'faker';

import { signUpService, signInService } from '../../src/services/auth';
import { mockReq, mockUser, res } from './mocks';

import * as bcrypt from 'bcryptjs';

describe('src/controllers/auth', () => {
  const { username, email, name } = helpers.createCard();

  const req = {
    body: {
      username,
      email,
      password: name,
    },
    ...mockReq,
  };

  context('creates new user', () => {
    after(resetHistory);

    it('called User.create', async () => {
      await signUpService(req, res);

      expect(mockUser.create).to.have.been.calledWith(
        match({
          username,
          email,
        }),
      );
    });
  });

  context('signs in', () => {
    let bcryptStub;

    before(async () => {
      bcryptStub = stub(bcrypt.default, 'compareSync').returns(true);
      await signInService(req, res);
    });

    after(resetHistory);

    it('called User.findByLogin', async () => {
      expect(mockUser.findByLogin).to.have.been.calledWith(match(username));
    });

    it('called bcrypt.compareSync', async () => {
      expect(bcryptStub).to.have.been.called;
    });
  });
  // context('user exists', () => {
  //   before(async () => {
  //     fakeUser.update.resolves(fakeUser);
  //     User.findOne.resolves(fakeUser);
  //     result = await save({ id, ...data });
  //   });

  //   after(resetHistory);

  //   it('called User.findOne', () => {
  //     expect(User.findOne).to.have.been.calledWith(match({ where: { id } }));
  //   });

  //   it('called user.update', () => {
  //     expect(fakeUser.update).to.have.been.calledWith(match(data));
  //   });

  //   it('returned the user', () => {
  //     expect(result).to.deep.equal(fakeUser);
  //   });
  // });
});
