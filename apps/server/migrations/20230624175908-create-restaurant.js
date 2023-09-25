'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Restaurants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.STRING,
      },
      openingHours: {
        type: Sequelize.STRING,
      },
      closingHours: {
        type: Sequelize.STRING,
      },
      deliveryFee: {
        type: Sequelize.FLOAT,
      },
      minimumOrderValue: {
        type: Sequelize.FLOAT,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Restaurants');
  },
};
