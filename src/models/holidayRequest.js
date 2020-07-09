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
        name: 'userId',
        allowNull: false,
      },
      foreignKey: {
        name: 'approvedBy',
        allowNull: true,
      },
    });

    // HolidayRequest.belongsToMany(User, {
    //   through: 'approved_requests',
    //   foreignKey: 'requestId',
    //   otherKey: 'approvedBy',
    // });
  };

  return HolidayRequest;
};

export default holidayRequest;
