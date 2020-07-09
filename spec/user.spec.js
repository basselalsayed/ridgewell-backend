import 'regenerator-runtime/runtime.js';

import UserModel from '../src/models/user';
import HolidayModel from '../src/models/holiday';
import HolidayRequestModel from '../src/models/holidayRequest';
import RoleModel from '../src/models/role';
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

describe('src/models/User', () => {
  const [User, Holiday, HolidayRequest, Role] = [
    UserModel(sequelize, dataTypes),
    HolidayModel(sequelize, dataTypes),
    HolidayRequestModel(sequelize, dataTypes),
    RoleModel(sequelize, dataTypes),
  ];

  const user = new User();

  checkModelName(User)('user');
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
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
      });
    });
    it('defined a second hasMany association with HolidayRequest', () => {
      expect(User.hasMany).to.have.been.calledWith(HolidayRequest, {
        foreignKey: {
          name: 'approvedBy',
          allowNull: true,
        },
      });
    });

    it('defined a belongsTo association with Role', () => {
      // expect(User.belongsTo).to.have.been.calledWith(Role);
      expect(User.belongsToMany).to.have.been.calledWith(Role, {
        foreignKey: 'userId',
        otherKey: 'roleId',
        through: 'user_roles',
      });
    });
  });
});
