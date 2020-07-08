import Sequelize, { DataTypes } from 'sequelize';
import message from './message';
import user from './user';

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
    process.env.DATABASE_URL,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: 'postgres',
    },
  );
}

const models = {
  User: user(sequelize, DataTypes),
  Message: message(sequelize, DataTypes),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
