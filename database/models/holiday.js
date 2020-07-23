'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Holiday extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Holiday.hasMany(models.HolidayRequest, {
        foreignKey: {
          name: 'holidayId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
      });

      Holiday.belongsTo(models.User, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
      });
    }
  }
  Holiday.init(
    {
      from: DataTypes.DATE,
      until: DataTypes.DATE,
      confirmed: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Holiday',
    },
  );
  return Holiday;
};
