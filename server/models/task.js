'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Task.init({
    title: {
      type: DataTypes.STRING
    },
    due_date: {
      type: DataTypes.DATE
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN
    },
    completedAt: {
      type: DataTypes.DATE
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};