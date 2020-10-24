import { expect } from 'chai';
import { match, resetHistory, stub, restore } from 'sinon';
import { helpers } from 'faker';

import { mockReq, mockUser, res } from './mocks';

import * as bcrypt from 'bcryptjs';
import * as Helpers from '../../src/controllers/helpers';

xdescribe('src/controllers/auth', () => {
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

    before(async () => {
      bcryptStub = stub(bcrypt.default, 'compareSync').returns(true);
      validStub = stub(Helpers, 'validPass');
      await signInService(req, res);
    });

    after(restore);

    it('called User.findByLogin', async () => {
      expect(mockUser.findByLogin).to.have.been.calledWith(match(username));
    });

    it('called bcrypt.compareSync', async () => {
      expect(bcryptStub).to.have.been.called;
    });
    xit('called validPass', async () => {
      expect(validStub).to.have.been.called;
    });
  });

  xcontext('unsuccessful signin', () => {
    let invalidStub;

    before(async () => {
      stub(bcrypt.default, 'compareSync').returns(false);
      invalidStub = stub(Helpers, 'invalidPass');
      await signInService(req, res);
    });

    after(restore);

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
