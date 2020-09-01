'use strict';
const {
  Model
} = require('sequelize');
// const bcrypt = require("bcryptjs");
const { hashPassword, checkPassword } = require("../helpers/bcrypt.js");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo);
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        is: {
          args: /^[a-zA-Z0-9_]{3,15}$/,
          msg: "username can only be consisted of alphanumeric and special characters, such as: '_'"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: {
          args: true,
          msg: "email is required!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: {
          args: [8, 15],
          msg: "password must be consisted of 8 to 15 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password);
  });
  return User;
};