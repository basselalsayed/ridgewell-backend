const holidayRequest = (sequelize, DataTypes) => {
  const HolidayRequest = sequelize.define('holidayRequest', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    from: {
      type: DataTypes.DATE,
    },
    until: {
      type: DataTypes.DATE,
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  HolidayRequest.associate = ({ Holiday, User }) => {
    HolidayRequest.belongsTo(Holiday, {
      foreignKey: {
        name: 'holidayId',
        allowNull: false,
      },
    });
    HolidayRequest.belongsTo(User, {
      foreignKey: {
        name: 'owner',
        allowNull: false,
      },
    });

    HolidayRequest.belongsToMany(User, {
      as: 'managerId',
      through: 'approvedRequests',
      foreignKey: 'requestId',
      otherKey: 'managerId',
    });
  };

  return HolidayRequest;
};

export default holidayRequest;
