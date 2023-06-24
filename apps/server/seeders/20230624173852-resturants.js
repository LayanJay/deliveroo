'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */

const restaurants = [...Array(10)].map((restaurant) => ({
  name: faker.company.buzzPhrase(),
  address: faker.location.streetAddress(),
  phone: faker.phone.number(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return await queryInterface.bulkInsert('Restaurants', restaurants);
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Restaurants', null, {});
  },
};
