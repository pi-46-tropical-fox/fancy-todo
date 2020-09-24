'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  
    static associate(models) {
      User.hasMany(models.Todo, {foreignKey: "UserId", targetKey: "id"});
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
    validate:{
      notEmpty:{
      args : true,
      msg : "Email Cannot be Empty"
    }
   }
  },
    password: {
    type : DataTypes.STRING,
    validate:{
      notEmpty:{
        args : true,
        msg : "Password Cannot be Empty"
      }
    }
  }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (user, options) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
  });

  return User;
};