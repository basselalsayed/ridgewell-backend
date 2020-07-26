'use strict';

export const up = async (queryInterface, Sequelize) => {
  return queryInterface
    .createTable('UserRoles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
    .then(() => {
      // Create Unique CompoundIndex
      let sql = `CREATE UNIQUE INDEX "UserRoleCompoundIndex"
            ON public."UserRoles"
            USING btree
            ("userId", "roleId");
          `;
      return queryInterface.sequelize.query(sql, { raw: true });
    });
};
export const down = async (queryInterface, Sequelize) => {
  return queryInterface.dropTable('UserRoles');
};
