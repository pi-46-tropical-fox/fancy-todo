'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn("Projects", "TodoId", {
      type : Sequelize.INTEGER,
      references : {
        model : "Todos",
        key : 'id'
      },
      onUpdate : 'CASCADE',
      onDelete : 'CASCADE'
    }).then(()=>{
      queryInterface.addColumn("Projects", "UserId", {
        type : Sequelize.INTEGER,
        references : {
          model : "Users",
          key : 'id'
        },
        onUpdate : 'CASCADE',
        onDelete : 'CASCADE'
      })
    })
    .catch(err=>{
      console.log(err);
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('MovieCasts', 'CastId')
    .then(()=>{
      return queryInterface.removeColumn('MovieCasts', 'MovieId')
    })
  }
};
