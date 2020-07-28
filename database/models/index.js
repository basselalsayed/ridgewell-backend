'use strict';

import configEnv from '../config/config';

import Sequelize, { DataTypes } from 'sequelize';

import holiday from './holiday';
import holidayRequest from './holidayRequest';
import role from './role';
import user from './user';

const env = process.env.NODE_ENV || 'development';

const config = configEnv[env];

let sequelize;

if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

const models = {
  User: user(sequelize, DataTypes),
  Holiday: holiday(sequelize, DataTypes),
  HolidayRequest: holidayRequest(sequelize, DataTypes),
  Role: role(sequelize, DataTypes),
};

Object.keys(models).forEach(model => {
  if (models[model].associate) models[model].associate(models);
});

const db = { sequelize, Sequelize };

export default db;
