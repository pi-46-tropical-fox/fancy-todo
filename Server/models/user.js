'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Project,{through: models.Todo})
      User.hasMany(models.Todo)
    }
  };
  User.init({
    name:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name is required!'
        }
      }
    },
    email:{
      type: DataTypes.STRING,
      unique:{
        args: true,
        msg: 'email has been taken, please change'
      },
      validate: {
        notEmpty: {
          msg: 'Email is required!'
        },
        isEmail: {
          msg: 'Email must use email format!'
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required!'
        },
        len: {
          args: [6, 100],
          msg: 'password min 6 characters'
        }
      }
    },
    role:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Role is required!'
        }
      }
    },
    pictureUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user) {
        var salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });
  return User;
};