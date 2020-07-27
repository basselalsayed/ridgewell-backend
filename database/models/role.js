'use strict';

export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
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
      through: 'UserRoles',
      foreignKey: 'roleId',
      otherKey: 'userId',
    });
  };

  return Role;
};
