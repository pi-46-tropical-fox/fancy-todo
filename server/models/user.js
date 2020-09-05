'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/passwordHash');
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
    email: {
      type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg: 'Harus Format Email'
        },
        notEmpty: {
          args : true,
          msg : 'Email Tidak Boleh Kosong'
        },
      },
      unique : true
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Password Tidak Boleh Kosong'
        },
        min: 6
      }
    }
  }, {
    hooks: {
      beforeCreate: async (user, options) => {
        const data = await hash(user)
        user.password = data
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};