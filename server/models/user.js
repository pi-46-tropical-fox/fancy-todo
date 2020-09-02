'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/password');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get fullname(){
      return `${this.firstname} ${this.lastname}`
    }
    
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    firstname: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg: "First Name Must Be Filled"
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Last Name Must Be Filled"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "Username Must Be Filled"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Email Must Be Filled"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
          args: [6],
          msg: "Password minimal 6 characters"
        },
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate( (user, options) => {
    user.password = hashPassword(user.password)
  });
  return User;
};