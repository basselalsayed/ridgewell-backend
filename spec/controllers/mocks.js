import { stub } from 'sinon';

import { makeMockModels } from 'sequelize-test-helpers';

const mockUser = {
  create: stub().resolves(true),
  findAll: stub().resolves(true),
  findByLogin: stub().resolves(true),
};
const mockHoliday = {
  findAll: stub().resolves(true),
};
const models = makeMockModels({
  Holiday: mockHoliday,
  User: mockUser,
});

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

export { mockHoliday, mockUser, models, mockReq, res };
