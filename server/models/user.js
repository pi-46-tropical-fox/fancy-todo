'use strict';
const { createHash } = require('../helpers/BcryptHelper')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { hooks: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Is your name '', or empty?"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "How should I call you if your username is '', or empty?"
        },
        // min 6 chars
        minLength(value){
          if(value.length < 6){
            throw new Error('Make your username longer than 6 characters, please, or else.')
          }
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Do you want your account be accessible by anyone?"
        },
        // min 6 chars
        minLength(value){
          if(value.length < 6){
            throw new Error('Do you want your password be hackable?')
          }
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      afterValidate: (instance, options) => {
        instance.password = createHash(instance.password)
      }
    },
    modelName: 'User',
  });
  return User;
};