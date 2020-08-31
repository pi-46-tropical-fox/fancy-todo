'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require(`bcryptjs`)

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Todo)
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, opstion) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
  })
  return User;
};