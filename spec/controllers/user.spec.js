import { expect } from 'chai';
import { match, stub, resetHistory } from 'sinon';

import { makeMockModels } from 'sequelize-test-helpers';

import { allAccess } from '../../src/controllers';

describe('src/controllers/user', () => {
  const mockUser = { findAll: stub().returns(true) };
  const models = makeMockModels({ User: mockUser });

  const req = {
    context: { models },
  };

  const res = (() => {
    const mockRes = {};
    mockRes.json = stub().returns(mockRes);
    mockRes.send = stub().returns(mockRes);
    mockRes.status = stub().returns(mockRes);
    return mockRes;
  })();
  // const fakeUser = { id, ...data, update: stub() };

  context('gets all users', () => {
    after(resetHistory);

    it('called User.findAll', async () => {
      await allAccess(req, res);
      expect(mockUser.findAll).to.have.been.calledWith(
        match({
          attributes: {
            exclude: ['password'],
          },
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
