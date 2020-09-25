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
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title tidak boleh kosong"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Description tidak boleh kosong"
        }
      }
    },
    status: {type: DataTypes.BOOLEAN },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isNotEmpty: (value) => {
          if (!value) throw new Error('Due datae is required');
          else if (new Date(value)< new Date()) {
            throw new Error('Due date is lesser than today');
          }
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
    hooks: {
      beforeCreate(user, option) {
        user.status = false;
      }
    }
  });
  return Todo;
};