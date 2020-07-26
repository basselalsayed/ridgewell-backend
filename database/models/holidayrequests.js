'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class HolidayRequests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      HolidayRequest.belongsTo(models.Holiday, {
        foreignKey: {
          name: 'holidayId',
          allowNull: false,
        },
      });
      HolidayRequest.belongsTo(models.User, {
        foreignKey: {
          name: 'owner',
          allowNull: false,
        },
      });

      HolidayRequest.belongsToMany(models.User, {
        as: 'managerId',
        through: 'approvedRequests',
        foreignKey: 'requestId',
        otherKey: 'managerId',
      });
    }
  }
  HolidayRequests.init(
    {
      type: DataTypes.STRING,
      from: DataTypes.DATE,
      until: DataTypes.DATE,
      resolved: DataTypes.BOOLEAN,
      holidayId: DataTypes.INTEGER,
      owner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'HolidayRequests',
    },
  );
  return HolidayRequests;
};
