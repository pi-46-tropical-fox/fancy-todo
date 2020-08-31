'use strict';
const {
  Model
} = require('sequelize');
const hashPassword = require('../helpers/hashPassword');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: {
      type : DataTypes.STRING,
      unique: true
    },
    email: {
      type : DataTypes.STRING,
      validate:{
        isEmail: {
          args: true,
          msg: "Email yang anda masukkan salah"
        },
      }
    },
    password: {
      type : DataTypes.STRING,
      validate:{
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-!@#$%^&*()_+=]).{8,}$/,
          msg:
            'The password must contain at least 8 characters including at least a uppercase, a lowercase and a number.'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(userData){
        userData.password = hashPassword(userData)
      }
    }
  });
  return User;
};