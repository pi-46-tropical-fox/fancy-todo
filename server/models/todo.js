'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {
      Todo.belongsTo(models.User, {foreignKey:"UserId"})
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title can not be empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description can not be empty"
        },
      },
    },
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
          notEmpty: {
            args: true,
            msg: "Due_date can not be empty"
          },
          checkDate (value) {
            if(value !== ''){
              if(value.toISOString().split("T")[0] > new Date().toISOString().split("T")[0] || value.toISOString().split("T")[0] < new Date().toISOString().split("T")[0]){
                throw new Error("Can not set date for tomorrow's date")
              }
            }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.beforeCreate((user, option) => {
    user.status = false
  })

  return Todo;
};