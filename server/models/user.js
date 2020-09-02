'use strict';
const {
    Model
} = require('sequelize');
const { hash } = require('../helpers/bcrypt')
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
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Username can't be empty"
                },
                isAlphanumeric: {
                    args: true,
                    msg: "Username can only contain alphanumeric"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: "Invalid email format"
                },
                notEmpty: {
                    args: true,
                    msg: "Email can't be empty"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                isLongEnough(value) {
                    if (value.length < 6) {
                        throw new Error('Password must contain min. 6 characters.');
                    }
                }
            }
        }
    }, {
        sequelize,
        modelName: 'User',
        hooks: {
            beforeCreate(user) {
                user.password = hash(user.password)
            }
        }
    });

    return User;
};