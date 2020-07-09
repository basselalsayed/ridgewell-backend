import Sequelize, { DataTypes } from 'sequelize';
import holiday from './holiday';
import user from './user';
import role from './role';

let sequelize;
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true, //false
  });
} else {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
    },
  );
}

const models = {
  User: user(sequelize, DataTypes),
  Holiday: holiday(sequelize, DataTypes),
  Role: role(sequelize, DataTypes),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) models[key].associate(models);
});

const ROLES = ['user', 'admin'];

export { sequelize, ROLES };

export default models;
