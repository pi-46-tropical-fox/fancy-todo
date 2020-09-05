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
        isEmail : true,
        notEmpty: true
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : true
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