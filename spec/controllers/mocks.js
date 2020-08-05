import { stub } from 'sinon';

import { makeMockModels } from 'sequelize-test-helpers';

const mockUser = {
  create: stub().resolves(true),
  findAll: stub().returns(true),
  findByLogin: stub().returns(true),
};
const models = makeMockModels({ User: mockUser });

const mockReq = {
  context: { models },
};

const res = (() => {
  const mockRes = {};
  mockRes.json = stub().returns(mockRes);
  mockRes.send = stub().returns(mockRes);
  mockRes.status = stub().returns(mockRes);
  return mockRes;
})();

export { mockUser, models, mockReq, res };
