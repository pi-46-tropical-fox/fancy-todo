'use strict';
const {
  Model
} = require('sequelize');
const {hashing} = require(`../helpers`)

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username can not be empty"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email can not be empty"
        },
        isEmail: {
          args: false,
          msg: "Email format is wrong. e.g. foo@mail.com"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password can not be empty"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    user.password = hashing(user.password)
  })
  
  return User;
};