'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
  ]
    static associate(models) {
      User.hasMany(models.Todo, {foreignKey: "UserId", targetKey: "id"});
    }
  };
  User.init({
    email: {
      type : DataTypes.STRING,
      unique:true,
    validate:{
      notEmpty:{
      args : true,
      msg : "Fill Your Email"
    }
   }
  },
    password: {
    type : DataTypes.STRING,
    validate:{
      notEmpty:{
        args : true,
        msg : "fill your password"
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