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

describe('database/models/holiday', () => {
  const [Holiday, User, HolidayRequest] = [
    HolidayModel(sequelize, dataTypes),
    UserModel(sequelize, dataTypes),
    HolidayRequestModel(sequelize, dataTypes),
  ];

  const holiday = new Holiday();

  checkModelName(Holiday)('Holiday');

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
