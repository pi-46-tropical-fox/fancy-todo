'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    name:{
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Name required'
        }
      }
    }, 
    email:{
      type: DataTypes.STRING,
      unique:{
        args: true,
        msg: 'email already taken'
      },
      validate: {
        notEmpty: {
          msg: 'Email required!'
        },
        isEmail: {
          msg: 'Please use email format'
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password required!'
        },
        len: {
          args: [8, 100],
          msg: 'password min 8 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        let salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt)
      }
    }
  });
  return User;
};