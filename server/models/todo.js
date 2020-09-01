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
          args:[10],
          msg: 'please inser passrowd minimum ten characters'
        }
      }
    },
    description: { type : DataTypes.STRING,
      validate:{
        notEmpty:{
          args:[10],
          msg: 'please inser passrowd minimum ten characters'
        }
      }},
    status: DataTypes.BOOLEAN,
    due_date:{
      type: DataTypes.DATE,
      validate:{
        isPassed(value){
          if(value.toISOString().split("T")[0] > new Date().toISOString().split("T")[0] || value.toISOString().split("T")[0] < new Date().toISOString().split("T")[0]){
            throw new Error('Invalid date')
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