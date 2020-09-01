'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
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
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `First name cannot be empty`
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Last Name cannot be empty`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Email cannot be empty`
        },
        isEmail: {
          args: true,
          msg: `Invalid email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password cannot be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user){
        user.password = bcrypt.hashSync(user.password, salt)
      }
    }
  });
  return User;
};