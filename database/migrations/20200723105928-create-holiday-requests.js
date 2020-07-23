'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('HolidayRequests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true,
        },
      },
      from: {
        type: Sequelize.DATE,
      },
      until: {
        type: Sequelize.DATE,
      },
      resolved: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        validate: {
          notEmpty: true,
        },
      },
      holidayId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      owner: {
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
    await queryInterface.dropTable('HolidayRequests');
  },
};
