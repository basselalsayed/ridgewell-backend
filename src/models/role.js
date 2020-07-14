const role = (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  });

  Role.associate = ({ User }) => {
    Role.belongsToMany(User, {
      through: 'user_roles',
      foreignKey: 'roleId',
      otherKey: 'userId',
    });
  };

  return Role;
};

export default role;
