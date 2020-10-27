import HolidayModel from '../../database/models/Holiday';
import UserModel from '../../database/models/User';
// import RoleModel from '../../database/models/Role';
// import HolidayRequestModel from '../../database/models/HolidayRequest';

import { stub } from 'sinon';

import { dataTypes, makeMockModels, sequelize } from 'sequelize-test-helpers';
import { Sequelize } from '../../database/models';

const Holiday = HolidayModel(sequelize, dataTypes);
// const mockHolidayRequest = HolidayRequestModel(sequelize, dataTypes);
// const mockRole = RoleModel(sequelize, dataTypes);
const User = UserModel(sequelize, dataTypes);

const mockUser = {
  ...User,
  create: stub().resolves(true),
  findAll: stub().resolves(true),
  findByLogin: stub().resolves(true),
};

const mockHoliday = {
  ...Holiday,
  create: stub().resolves(true),
  destroy: stub().resolves(true),
  findAll: stub().returns(new Array()),
  findByPk: stub().resolves(true),
  update: stub().resolves(true),
};

const models = makeMockModels({
  Holiday: mockHoliday,
  User: mockUser,
});

const mockReq = {
  context: {
    db: {
      sequelize: {
        models,
        transaction: stub().resolves(true),
      },
      Sequelize,
    },
    models,
  },
};

const res = (() => {
  const mockRes = {};
  mockRes.json = stub().returns(mockRes);
  mockRes.send = stub().returns(mockRes);
  mockRes.status = stub().returns(mockRes);
  return mockRes;
})();

const mockNext = stub().returns(true);
export { mockHoliday, mockUser, models, mockReq, mockNext, res };
