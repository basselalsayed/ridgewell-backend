import { expect } from 'chai';
import { match, resetHistory } from 'sinon';

import { allAccess } from '../../src/controllers';

import { mockReq, mockUser, res } from './mocks';

xdescribe('src/controllers/user', () => {
  context('gets all users', () => {
    after(resetHistory);

    it('called User.findAll', async () => {
      await allAccess(mockReq, res);
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
