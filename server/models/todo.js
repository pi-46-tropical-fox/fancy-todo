'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Todo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Todo.belongsTo(models.User)
        }
    };
    Todo.init({
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.STRING,
        UserId: DataTypes.INTEGER,
        due_date: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNotEmpty: (value) => {
                    if (!value) {
                        throw new Error('Due date is required');
                    } else {
                        if (new Date(value) < new Date()) {
                            throw new Error('Due date is invalid')
                        }
                    }
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Todo',
        hooks: {
            beforeCreate(todo) {
                todo.due_date = todo.due_date.split('/').join('-')
            }
        }
    });
    return Todo;
};