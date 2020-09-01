'use strict';
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
        notEmpty:{
          msg: "Password Must Be Filled"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};