'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Holiday, {
        foreignKey: {
          name: 'userId',
          allowNull: false,
        },
        onDelete: 'CASCADE',
      });

      User.hasMany(models.HolidayRequest, {
        as: 'owner',
        foreignKey: {
          name: 'owner',
          allowNull: false,
        },
        onDelete: 'CASCADE',
      });

      User.belongsToMany(models.HolidayRequest, {
        through: 'ApprovedRequests',
        foreignKey: 'managerId',
        otherKey: 'requestId',
      });
      User.belongsToMany(models.Role, {
        through: 'UserRoles',
        foreignKey: 'userId',
        otherKey: 'roleId',
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
