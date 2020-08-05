import { expect } from 'chai';
import { match, stub, resetHistory } from 'sinon';
import { helpers } from 'faker';
import { makeMockModels } from 'sequelize-test-helpers';

import { signUpService } from '../../src/services/auth';

describe('src/controllers/auth', () => {
  const mockUser = {
    create: stub().resolves(true),
    findByLogin: stub().returns(true),
  };
  const models = makeMockModels({ User: mockUser });
  const { username, email, name } = helpers.createCard();

  const req = {
    body: {
      username,
      email,
      password: name,
    },
    context: { models },
  };

  const res = (() => {
    const mockRes = {};
    mockRes.json = stub().returns(mockRes);
    mockRes.send = stub().returns(mockRes);
    mockRes.status = stub().returns(mockRes);
    return mockRes;
  })();

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
