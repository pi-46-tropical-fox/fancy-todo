'use strict';
const {
  Model
} = require('sequelize');
const hashedPassword = require('../helpers/hashPassword');

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
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `Invalid email format`
        },
        notEmpty: {
          args: true,
          msg: `Tidak boleh kosong`
        },
        unique: {
          args: true,
          msg: `Email must be unique`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Tidak boleh kosong`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((inst, opt) => {
    inst.password = hashedPassword(inst)
  })
  return User;
};