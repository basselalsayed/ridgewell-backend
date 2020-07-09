import 'regenerator-runtime/runtime.js';

import HolidayModel from '../src/models/holiday';
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

describe('src/models/Holiday', () => {
  const [Holiday, User] = [
    HolidayModel(sequelize, dataTypes),
    UserModel(sequelize, dataTypes),
  ];

  const holiday = new Holiday();

  checkModelName(Holiday)('holiday');

  context('properties', () => {
    ['from', 'until', 'confirmed'].forEach(checkPropertyExists(holiday));
  });

  context('associations', () => {
    before(() => {
      Holiday.associate({ User });
    });

    it('defined a belongsTo association with User', () => {
      expect(Holiday.belongsTo).to.have.been.calledWith(User);
    });
  });
});
