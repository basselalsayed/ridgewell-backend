'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HolidayRequests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  HolidayRequests.init({
    type: DataTypes.STRING,
    from: DataTypes.DATE,
    until: DataTypes.DATE,
    resolved: DataTypes.BOOLEAN,
    holidayId: DataTypes.INTEGER,
    owner: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HolidayRequests',
  });
  return HolidayRequests;
};