'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helpers/hashPassword');

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
      unique: {
        args: true,
        msg: `Email sudah ada`
      },
      validate: {
        isEmail: {
          args: true,
          msg: `Invalid email format`
        },
        notEmpty: {
          args: true,
          msg: `Tidak boleh kosong`
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
    inst.password = hashPassword(inst.password)
  })
  return User;
};