const holiday = (sequelize, DataTypes) => {
  const Holiday = sequelize.define('holiday', {
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
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

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

export default holiday;
