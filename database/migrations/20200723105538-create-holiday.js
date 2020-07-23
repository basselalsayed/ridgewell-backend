'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Holidays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      from: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          notEmpty: true,
        },
      },
      until: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          notEmpty: true,
        },
      },
      confirmed: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        validate: {
          notEmpty: true,
        },
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Holidays');
  },
};
