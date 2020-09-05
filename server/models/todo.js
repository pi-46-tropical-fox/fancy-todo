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
    tittle: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Title cannot be empty'
      }
    }
  },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty:{
          msg : 'Description cannot be empty'
      }
    }
  },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty:{
          msg : 'Status cannot be empty'
      }
    }
  },
    due_date: {
      type: DataTypes.DATEONLY,
      alidate: {
        isDate:{
          msg : 'Status cannot be empty'
      }
    }
  },
  
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.status = false
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};