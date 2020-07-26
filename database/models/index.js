const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

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

const db = {
  Holiday: sequelize.import('./holiday'),
  HolidayRequest: sequelize.import('./holidayRequest'),
  Role: sequelize.import('./role'),
  User: sequelize.import('./user'),
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

//models/index.js
