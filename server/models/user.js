'use strict';
const {
  Model
} = require('sequelize');
const { bcrypt, generate_bcrypt_hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo);
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: `Username must not be empty.`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: `Please insert the email in the correct format.`
        },
        notEmpty: {
          args: true,
          msg: `Email must not be empty.`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [6],
          msg: `Password must be at least 6 characters long.`
        },
        notEmpty: {
          args: true,
          msg: `Password must not be empty.`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    user.password = generate_bcrypt_hash(user.password);
  });
  return User;
};