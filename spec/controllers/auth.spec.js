import { expect } from 'chai';
import { match, resetHistory, stub, restore } from 'sinon';
import { helpers } from 'faker';

import { signUpService, signInService } from '../../src/services/auth';
import { mockReq, mockUser, res } from './mocks';

import * as bcrypt from 'bcryptjs';
import * as Helpers from '../../src/controllers/helpers';

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
    let validStub;
    let invalidStub;

    beforeEach(async () => {
      validStub = stub(Helpers, 'validPass').callsFake(true);
      invalidStub = stub(Helpers, 'invalidPass').returns(true);
      bcryptStub = stub(bcrypt.default, 'compareSync').returns(true);
      await signInService(req, res);
    });
    beforeEach(async () => {});

    afterEach(restore);

    it('called User.findByLogin', async () => {
      expect(mockUser.findByLogin).to.have.been.calledWith(match(username));
    });

    it('called bcrypt.compareSync', async () => {
      expect(bcryptStub).to.have.been.called;
    });
    xit('called validPass', async () => {
      console.log('[validStub]', validPass);
      expect(validStub).to.have.been.called;
    });
  });

  xcontext('unsuccessful signin', () => {
    let bcryptStub;
    let invalidStub;
    before(async () => {
      bcryptStub = stub(bcrypt.default, 'compareSync').returns(false);
      invalidStub = stub(Helpers, 'invalidPass').returns(true);
      await signInService(req, res);
    });

    it('called invalidPass', async () => {
      expect(invalidStub).to.have.been.called;
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
