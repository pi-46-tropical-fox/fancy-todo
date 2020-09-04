'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsToMany(models.User,{through: models.Todo},)  
      Project.hasMany(models.Todo)
    }
  };
  Project.init({
    projectName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Project Name is required!'
        }
      }
    },
    projectDescription: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Project Description is required!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};