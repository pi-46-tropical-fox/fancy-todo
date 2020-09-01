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
        isEmail : true
      },
      unique : {
        args : true,
        msg : "Please select another email address"
      }
    },
    password: DataTypes.STRING
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