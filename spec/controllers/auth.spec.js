import { expect } from 'chai';
import { match, resetHistory } from 'sinon';
import { helpers } from 'faker';

import { signUpService } from '../../src/services/auth';
import { mockReq, mockUser, res } from './mocks';

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
      // stub(db.default, 'sequelize').returns(mockDb);

      await signUpService(req, res);

      expect(mockUser.create).to.have.been.calledWith(
        match({
          username,
          email,
        }),
      );
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
