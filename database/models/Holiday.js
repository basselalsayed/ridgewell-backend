'use strict';

export default (sequelize, DataTypes) => {
  const Holiday = sequelize.define(
    'Holiday',
    {
      from: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      until: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
        defaultValue: 'annualLeave',
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    { paranoid: true },
  );

  Holiday.associate = ({ HolidayRequest, User }) => {
    Holiday.hasMany(HolidayRequest, {
      foreignKey: {
        name: 'holidayId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    Holiday.belongsTo(User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
  };

  return Holiday;
};
