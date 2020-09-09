'use strict';

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
   await queryInterface.bulkInsert("Todos", [
    {
      title: "API documentation",
      description: "Create API documentation",
      status: true,
      due_date: "2020-08-31T00:00:00.000Z",
      UserId: null,
      createdAt: "2020-08-31T10:37:45.054Z",
      updatedAt: "2020-08-31T10:37:45.054Z"
    },
  
    {
      title: "Go to Starbucks",
      description: "Buy caramel macchiatto with triple shots of espresso",
      status: false,
      due_date: "2020-09-01T00:00:00.000Z",
      UserId: null,
      createdAt: "2020-08-31T11:41:33.688Z",
      updatedAt: "2020-08-31T11:42:31.433Z"
    },
    {
      title: "Learn Vue.js",
      description: "Read Vue.js documentation and try to code it",
      status: false,
      due_date: "2020-09-01T17:00:00.000Z",
      UserId: null,
      createdAt: "2020-08-31T15:55:40.072Z",
      updatedAt: "2020-08-31T15:58:47.877Z"
    }
  
  ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Todos", null, {});
  }
};
