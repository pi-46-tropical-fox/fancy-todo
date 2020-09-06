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
      Todo.belongsTo (models.User)
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type : DataTypes.DATE,
      validate : {
        isNotLessThanToday (date) {
          let today = new Date ()
          let todoDate = new Date (date)
          if (todoDate <= today || todoDate == today) {
            throw new Error (`You can't set your todo list less than today's date`)

          }

        }
      }
    },
    UserId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};