import 'regenerator-runtime/runtime.js';

import UserModel from '../../database/models/user';
import HolidayModel from '../../database/models/holiday';
import HolidayRequestModel from '../../database/models/holidayRequest';
import RoleModel from '../../database/models/role';
import chai, { expect } from 'chai';
import {
  checkModelName,
  checkPropertyExists,
  dataTypes,
  sequelize,
} from 'sequelize-test-helpers';

import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('database/models/user', () => {
  const [User, Holiday, HolidayRequest, Role] = [
    UserModel(sequelize, dataTypes),
    HolidayModel(sequelize, dataTypes),
    HolidayRequestModel(sequelize, dataTypes),
    RoleModel(sequelize, dataTypes),
  ];

  const user = new User();

  checkModelName(User)('User');

  context('properties', () => {
    ['username', 'email', 'password'].forEach(checkPropertyExists(user));
  });

  context('associations', () => {
    before(() => {
      User.associate({ Holiday, HolidayRequest, Role });
    });

    it('defined a hasMany association with Holiday', () => {
      expect(User.hasMany).to.have.been.calledWith(Holiday, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
      });
    });

    it('defined a hasMany association with HolidayRequest', () => {
      expect(User.hasMany).to.have.been.calledWith(HolidayRequest, {
        as: 'owner',
        foreignKey: {
          name: 'owner',
          allowNull: false,
        },
        onDelete: 'CASCADE',
      });
    });

    it('defined a second hasMany association with HolidayRequest', () => {
      expect(User.belongsToMany).to.have.been.calledWith(HolidayRequest, {
        through: 'ApprovedRequests',
        foreignKey: 'managerId',
        otherKey: 'requestId',
      });
    });

    it('defined a belongsTo association with Role', () => {
      expect(User.belongsToMany).to.have.been.calledWith(Role, {
        foreignKey: 'userId',
        otherKey: 'roleId',
        through: 'UserRoles',
      });
    });
  });
});
