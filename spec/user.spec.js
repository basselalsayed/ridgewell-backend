import 'regenerator-runtime/runtime.js';

import UserModel from '../src/models/user';
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
  const [User, Role] = [
    UserModel(sequelize, dataTypes),
    RoleModel(sequelize, dataTypes),
  ];

  const user = new User();

  checkModelName(User)('user');
  context('properties', () => {
    ['username', 'email', 'password'].forEach(checkPropertyExists(user));
  });

  context('associations', () => {
    before(() => {
      User.associate({ Role });
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
