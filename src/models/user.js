import { Sequelize } from 'sequelize';
const Op = Sequelize.Op;

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
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
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    User.hasMany(HolidayRequest, {
      foreignKey: {
        name: 'approvedBy',
        allowNull: true,
      },
    });

    User.belongsToMany(Role, {
      through: 'user_roles',
      foreignKey: 'userId',
      otherKey: 'roleId',
    });
  };

  User.findByLogin = async login =>
    await User.findOne({
      where: {
        [Op.or]: [{ username: login }, { email: login }],
      },
    });

  return User;
};

export default user;
