const {
	Model,
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
			Todo.belongsTo(models.User);
		}
	}
	Todo.init({
		title: DataTypes.STRING,
		description: DataTypes.STRING,
		status: DataTypes.STRING,
		due_date: {
			type : DataTypes.TIME,
			validate: {
				afterToday(dueDate){
					if(dueDate < new Date()){
						throw new Error('Tanggal tidak bisa sebelum hari ini!')
					}
				}
			}
		},
		UserId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'User',
				key: 'id',
			},
		},
	}, {
		sequelize,
		modelName: 'Todo',
	});
	return Todo;
};
