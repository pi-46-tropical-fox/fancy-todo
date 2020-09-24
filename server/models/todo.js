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
          args:true,
          msg:`please insert title`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:`please insert description`
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type:DataTypes.DATE,
      validate:{
        customValidate(value){
          console.log(value.toISOString().split("T")[0],'value')
          console.log(new Date().toISOString().split("T")[0])
          if (value.toISOString().split("T")[0] < new Date().toISOString().split("T")[0] ){
            throw new Error (`invalid due date input`)
          }
          if (value.toISOString().split("T")[0] > new Date().toISOString().split("T")[0]){
            throw new Error (`invalid due date input`)
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
  
  // Todo.beforeUpdate((user, option) => {
  //   user.status = false
  // })
  return Todo;
};