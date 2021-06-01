'use strict';

export const up = async (queryInterface, Sequelize) => {
  return queryInterface
    .createTable('ApprovedRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      requestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      managerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
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
      let sql = `CREATE UNIQUE INDEX "ApprovedRequestCompoundIndex"
            ON public."ApprovedRequests"
            USING btree
            ("managerId", "requestId");
          `;
      return queryInterface.sequelize.query(sql, { raw: true });
    });
};
export const down = async (queryInterface, Sequelize) => {
  return queryInterface.dropTable('ApprovedRequests');
};
