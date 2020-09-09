'use strict';
const {
  Model
} = require('sequelize');
// const bcryptjs = require('bcryptjs')
const passwordHasher = require('../helpers/bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    // username: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: 'Password must be at least 6 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        }
      },
      unique: true
    },
    city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  // User.beforeCreate((user, options) => {
  //   let salt = bcryptjs.genSaltSync(10);
  //   let hash = bcryptjs.hashSync(user.password, salt);
  //   user.password = hashy
  // })
  User.beforeCreate((user, options) => {
    user.password = passwordHasher(user.password)
  })
  return User;
};