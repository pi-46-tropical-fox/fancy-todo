'use strict';
const { Model } = require('sequelize');
const isPast = require('date-fns/isPast');
const isToday = require('date-fns/isToday');
module.exports = (sequelize, DataTypes) => {
	class Todo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Todo.init(
		{
			title: DataTypes.STRING,
			description: DataTypes.STRING,
			status: DataTypes.STRING,
			due_date: {
				type: DataTypes.DATE,
				validate: {
					notPast(value) {
						if (isPast(new Date(value)) && !isToday(new Date(value))) {
							throw new Error('Tanggal tidak boleh lewat hari ini');
						}
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'Todo',
		}
	);
	return Todo;
};
