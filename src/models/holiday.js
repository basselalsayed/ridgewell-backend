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

  Holiday.associate = models => {
    Holiday.belongsTo(models.User);
  };

  return Holiday;
};

export default holiday;
