'use strict';

export default (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    'Notification',
    {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      read: {
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

  Notification.associate = ({ HolidayRequest, User }) => {
    Notification.belongsTo(User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
    });
    Notification.belongsTo(HolidayRequest, {
      foreignKey: {
        name: 'requestId',
        allowNull: false,
      },
    });
  };

  return Notification;
};
