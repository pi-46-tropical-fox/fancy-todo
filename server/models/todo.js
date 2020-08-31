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
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Title cannot be empty'
        }
      }
    },
    description:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Description cannot be empty'
        }
      }
    },
    status:  {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Status cannot be empty'
        }
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      validate: {
          isDate: {
            msg: 'Wrong Date Format'
          }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};