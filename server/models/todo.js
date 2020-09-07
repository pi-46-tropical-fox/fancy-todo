"use strict";
const { Model } = require("sequelize");
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
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Title tidak boleh kosong"
          },
        },
      },
      description: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      due_date: {
        type: DataTypes.DATE,
        validate: {
          isAfter: {
            args: new Date().toISOString().split("T")[0],
            msg:"Tanggal harus lebih dari tanggal sekarang"
          }
        }
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  Todo.beforeCreate((inst, opt) => {
    if(!inst.status) {
      inst.status = false
    }
  })
  return Todo;
};
