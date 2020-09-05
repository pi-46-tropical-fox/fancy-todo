'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('Todos', 'UserId', {
       type: Sequelize.INTEGER,
       //allowNull: false,
       references: {
          model: 'Users',
          key: 'id'
       },
       onUpdate: 'CASCADE',
       onDelete: 'CASCADE'
     })
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.removeColumn('Todos', 'UserId')
  }
};