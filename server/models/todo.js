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
      validate : {
        notEmpty: {
          args: true,
          msg: 'Title cannot empty'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Description cannot empty'
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args : `${new Date()}`,
          msg : "Cannot enter date before today"
        }
      }
    },
    UserId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });

  Todo.addHook('beforeCreate', (Todo, options) => {
    Todo.status = false;
  });
  return Todo;
};