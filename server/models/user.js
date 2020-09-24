'use strict';
const {
  Model
} = require('sequelize');
let bcrypt = require('bcryptjs');
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
    username: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:`please insert username`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          args:true,
          msg:`wrong email format`
        },
        notEmpty:{
          args:`true`,
          msg:`please insert email`
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          args:true,
          msg:`please insert password`
        },
        len:{
          args:[4],
          msg:`password min 4 characters`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user, option) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash
  })
  
  User.beforeUpdate((user, option) => {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(user.password, salt);
    user.password = hash
  })

  return User;
};