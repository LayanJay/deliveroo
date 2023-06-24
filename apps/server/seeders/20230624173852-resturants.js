'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */

const restaurants = [...Array(10)].map(() => ({
  name: faker.company.buzzPhrase(),
  address: faker.location.streetAddress(),
  phone: faker.phone.number(),
  image: faker.image.urlLoremFlickr({
    width: 640,
    height: 480,
    category: 'restaurant',
  }),
  tags: faker.lorem.words({
    max: 5,
  }),
  openingHours: `11AM`,
  closingHours: `11PM`,
  deliveryFee: faker.number.float({ max: 10, min: 2 }),
  minimumOrderValue: faker.number.float({ max: 10, min: 5 }),
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
