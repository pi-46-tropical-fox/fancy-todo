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
      validate:{
        notEmpty:{
          args: true,
          msg: 'please insert title'
        }
      }
    },
    description: { type : DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: 'please insert description'
        }
      }},
    status: DataTypes.BOOLEAN,
    due_date:{
      type: DataTypes.DATE,
      validate:{
        isPassed(value){
          if(!value){
            throw new Error('please insert date')
          }else{
            if(new Date(value) < new Date()){
              throw new Error('Cannot insert passed date')
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
  return Todo;
};