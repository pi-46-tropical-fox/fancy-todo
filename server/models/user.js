'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
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
      validate:{
        isEmail:{
          args: true,
          msg:'Please Input the right email'
        },
        notEmpty:{
          args: true,
          msg:'please inser email'
        }
      }
    },
    password:{
      type : DataTypes.STRING,
      validate:{
        len:{
          args:[5],
          msg: 'please inser passrowd minimum five characters'
        }
      }
    },
    username:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg:'please insert username'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, option)=>{
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
  })
  
  return User;
};