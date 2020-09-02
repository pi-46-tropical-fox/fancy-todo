'use strict';
const {
  Model
} = require('sequelize');
const getDate = require('../helpers/getDate')
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User,({foreignKey:'UserId'}))
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          arg: true,
          msg: `Title cannot be empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          arg: true,
          msg: `Description cannot be empty`
        }
      }
    },
    status:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          arg: true,
          msg: `Status cannot be empty`
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
        notEmpty: {
          arg: true,
          msg: `Due date cannot be empty`
        },
        checkDate(value){
          if(value < getDate(new Date())){
            throw new Error(`The due date cannot be past or earlier than today`) 
          }
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};