import 'regenerator-runtime/runtime.js';

import HolidayModel from '../src/models/holiday';
import HolidayRequestModel from '../src/models/holidayRequest';
import UserModel from '../src/models/User';
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

describe('src/models/holiday', () => {
  const [Holiday, User, HolidayRequest] = [
    HolidayModel(sequelize, dataTypes),
    UserModel(sequelize, dataTypes),
    HolidayRequestModel(sequelize, dataTypes),
  ];

  const holiday = new Holiday();

  checkModelName(Holiday)('holiday');

  context('properties', () => {
    ['from', 'until', 'confirmed'].forEach(checkPropertyExists(holiday));
  });

  context('associations', () => {
    before(() => {
      Holiday.associate({ User, HolidayRequest });
    });

    it('defined a belongsTo association with User', () => {
      expect(Holiday.belongsTo).to.have.been.calledWith(User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      });
    });
    it('defined a hasMany association with HolidayRequest', () => {
      expect(Holiday.hasMany).to.have.been.calledWith(HolidayRequest, {
        foreignKey: {
          name: 'holidayId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
      });
    });
  });
});
