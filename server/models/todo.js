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
      this.belongsTo(models.User)
    }
  };
  Todo.init({
    title: {
        type: DataTypes.STRING,
        validate: {
          isLength(value){
            if(value.length < 3){
              throw new Error ("title must contain more than 3 characters")
            }
          }
        } 
    },
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /(complete|uncomplete)/,
          msg:
            'invalid status, input must be complete or uncomplete'
        }
      }
    },
    due_date: {
      type: DataTypes.STRING,
      validate: {
        isDate : {
          args : true,
          msg : "invalid date format"
        },
        isDateTrue(value){
          if (new Date(value) < new Date()){
            let error = new Error ()
            error.name = "SequelizeValidationError"
            error.message = "due_date value must be greater than now"
            throw error
          }
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