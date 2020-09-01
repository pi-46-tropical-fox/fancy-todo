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
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          message: 'Title must be filled'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          message: 'Description must be filled'
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate:{
        notEmpty:{
          message: 'Status must be filled'
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate:{
        notEmpty:{
          message: 'Date must be filled'
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