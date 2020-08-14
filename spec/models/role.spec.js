import 'regenerator-runtime/runtime.js';

import RoleModel from '../../database/models/Role';
import UserModel from '../../database/models/User';
import chai, { expect } from 'chai';
import {
  checkModelName,
  checkPropertyExists,
  dataTypes,
  sequelize,
} from 'sequelize-test-helpers';

import sinonChai from 'sinon-chai';

chai.use(sinonChai);

describe('database/models/Role', () => {
  const [Role, User] = [
    RoleModel(sequelize, dataTypes),
    UserModel(sequelize, dataTypes),
  ];

  const role = new Role();

  checkModelName(Role)('Role');

  context('properties', () => {
    ['id', 'name'].forEach(checkPropertyExists(role));
  });

  context('associations', () => {
    before(() => {
      Role.associate({ User });
    });

    it('defined a belongsTo association with Role', () => {
      expect(Role.belongsToMany).to.have.been.calledWith(User, {
        foreignKey: 'roleId',
        otherKey: 'userId',
        through: 'UserRoles',
      });
    });
  });
});
