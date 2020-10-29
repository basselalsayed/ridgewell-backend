'use strict';

import { Sequelize } from 'sequelize';
import { NotFound } from '../../src/utils/errors';
import { hashSync } from 'bcryptjs';

const { Op } = Sequelize;

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      set(givenInput) {
        this.setDataValue('email', hashSync(givenInput, 8));
      },
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      set(givenInput) {
        this.setDataValue('password', hashSync(givenInput, 8));
      },
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  User.associate = ({ Holiday, HolidayRequest, Role }) => {
    User.hasMany(Holiday, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    User.hasMany(HolidayRequest, {
      as: 'owner',
      foreignKey: {
        name: 'owner',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    User.belongsToMany(HolidayRequest, {
      through: 'ApprovedRequests',
      foreignKey: 'managerId',
      otherKey: 'requestId',
    });
    User.belongsToMany(Role, {
      through: 'UserRoles',
      foreignKey: 'userId',
      otherKey: 'roleId',
    });
  };

  User.findByLogin = async login =>
    await sequelize.transaction(async transaction => {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: login }, { email: login }],
        },
        include: [
          {
            association: 'Roles',
            attributes: ['name'],
          },
        ],
        transaction,
      });

      if (!user) throw new NotFound('No User Found');
      return user;
    });

  return User;
};
