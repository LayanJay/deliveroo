'use strict';
const { faker } = require('@faker-js/faker');
const _ = require('lodash');

const menus = [...Array(10)].map(() => ({
  categoryName: _.sample([`Salads`, `Soups`, `Main Dishes`, `Desserts`]),
  isAvailable: faker.datatype.boolean(),
  createdAt: new Date(),
  updatedAt: new Date(),
  RestaurantId: faker.number.int({ min: 1, max: 10 }),
}));

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return await queryInterface.bulkInsert('Menus', menus);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Menus', null, {});
  },
};
