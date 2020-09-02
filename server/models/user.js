'use strict';


const {
  Model
} = require('sequelize');

const bcrypt = require ("bcrypt")


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany (models.Todo)
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : "Invalid email format"
        },
        notEmpty: {
          rgs : true,
          msg : "You must insert your email address"
        }
      },
      unique : {
        args : true,
        msg : "Email Address has been registered"
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty: {
          rgs : true,
          msg : "You can't leave your password field empty"
        },
        unique : {
          args : true,
          msg : "Password has been registered"
        },
        len : {
          args : [5],
          msg : "Minimum Password length is 5 characters"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate (user, options) {
        let salt = bcrypt.genSaltSync (10)
        let hash = bcrypt.hashSync (user.password, salt)
        user.password = hash
      }
    }
  });
  return User;
};