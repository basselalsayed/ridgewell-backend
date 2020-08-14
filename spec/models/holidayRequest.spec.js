import 'regenerator-runtime/runtime.js';

import HolidayModel from '../../database/models/Holiday';
import HolidayRequestModel from '../../database/models/HolidayRequest';
import UserModel from '../../database/models/User';
import chai, { expect } from 'chai';
import {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists,
} from 'sequelize-test-helpers';

import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('database/models/holidayRequest', () => {
  const [HolidayRequest, Holiday, User] = [
    HolidayRequestModel(sequelize, dataTypes),
    HolidayModel(sequelize, dataTypes),
    UserModel(sequelize, dataTypes),
  ];

  const holidayRequest = new HolidayRequest();

  checkModelName(HolidayRequest)('HolidayRequest');

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
        through: 'ApprovedRequests',
        foreignKey: 'requestId',
        otherKey: 'managerId',
      });
    });
  });
});
