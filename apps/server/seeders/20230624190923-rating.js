'use strict';
const { faker } = require('@faker-js/faker');

const ratings = [...Array(10)].map(() => ({
  rating: faker.number.int({ min: 1, max: 5 }),
  comment: faker.lorem.paragraph(),
  createdAt: new Date(),
  updatedAt: new Date(),
  DishId: faker.number.int({ min: 11, max: 40 }),
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
    return await queryInterface.bulkInsert('Ratings', ratings);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Ratings', null, {});
  },
};
