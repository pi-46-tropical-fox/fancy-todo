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
        notEmpty: {
          args: true,
          msg: "username cannot be left blank!"
        },
        is: {
          args: /^[a-zA-Z0-9_]{3,15}$/,
          msg: "username can only be consisted of alphanumeric and special characters, such as: '_'"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "email cannot be left blank!"
        },
        isEmail: {
          args: true,
          msg: "please insert a valid email!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "password cannot be left blank!"
        },
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