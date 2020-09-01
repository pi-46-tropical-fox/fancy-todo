const {
	Model,
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			User.hasMany(models.Todo);
		}
	}
	User.init({
		username: DataTypes.STRING,
		email: DataTypes.STRING,
		password: {
			type: DataTypes.STRING,
			validate: {

			},
		},
	}, {
		sequelize,
		modelName: 'User',
		hooks: {
			async beforeCreate(user) {
				user.password = await hash(user.password);
			},
		},
	});
	return User;
};
