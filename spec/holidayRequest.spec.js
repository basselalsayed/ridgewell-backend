import 'regenerator-runtime/runtime.js';

import HolidayModel from '../src/models/holiday';
import HolidayRequestModel from '../src/models/holidayRequest';
import UserModel from '../src/models/user';
import chai, { expect } from 'chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
} from 'sequelize-test-helpers';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('src/models/holidayRequest', () => {
  const [HolidayRequest, Holiday, User] = [
    HolidayRequestModel(sequelize, dataTypes),
    HolidayModel(sequelize, dataTypes),
    UserModel(sequelize, dataTypes),
  ];

  const holidayRequest = new HolidayRequest();

  checkModelName(HolidayRequest)('holidayRequest');

  context('properties', () => {
    ['type', 'from', 'until', 'resolved'].forEach(
      checkPropertyExists(holidayRequest),
    );
  });

  context('associations', () => {
    before(() => {
      HolidayRequest.associate({ User, Holiday });
    });

    it('defined a belongsTo association with Holiday', () => {
      expect(HolidayRequest.belongsTo).to.have.been.calledWith(Holiday, {
        foreignKey: {
          name: 'holidayId',
          allowNull: false,
        },
      });
    });

    it('defined a belongsTo association with User', () => {
      expect(HolidayRequest.belongsTo).to.have.been.calledWith(User, {
        foreignKey: {
          name: 'owner',
          allowNull: false,
        },
      });
      expect(HolidayRequest.belongsToMany).to.have.been.calledWith(User, {
        as: 'managerId',
        through: 'approvedRequests',
        foreignKey: 'requestId',
        otherKey: 'managerId',
      });
    });
  });
});
