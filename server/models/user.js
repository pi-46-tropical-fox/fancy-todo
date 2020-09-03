'use strict';
const {
  Model
} = require('sequelize');

const { Sequelize } = require('.');
const {createHash} = require('../helpers/validateUser')

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
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      notEmpty: true,
      validate :{
        isEmail: {
          args: true,
          msg: 'invalid email format'
        }
      } 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 15],
          msg: 'Pasword min 6 characters max 15 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (User,options) => {
    const hash = createHash(User.password)
    User.password = hash
  } )

  return User;
};