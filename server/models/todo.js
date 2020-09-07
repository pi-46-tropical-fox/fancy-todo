'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
      type : DataTypes.STRING,
      validate : { 
        notEmpty : {
          args : true,
          msg : "Title must not empty!"
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type : DataTypes.DATE,
      validate : {
        isAfter : {
          args : new Date().toLocaleDateString(),
          msg : "Minimum due date is today!"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};