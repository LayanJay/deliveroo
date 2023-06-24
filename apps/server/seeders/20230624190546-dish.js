'use strict';
const { faker } = require('@faker-js/faker');

const dishes = [...Array(10)].map(() => ({
  dishName: faker.lorem.words(),
  isAvailable: faker.datatype.boolean(),
  price: faker.number.float({ max: 10, min: 2 }),
  description: faker.lorem.paragraph(),
  image: faker.image.urlLoremFlickr({
    width: 640,
    height: 480,
    category: 'food',
  }),
  calories: faker.number.float({ max: 1000, min: 100 }),
  createdAt: new Date(),
  updatedAt: new Date(),
  MenuId: faker.number.int({ min: 1, max: 10 }),
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
    return await queryInterface.bulkInsert('Dishes', dishes);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('Dishes', null, {});
  },
};
