const {
	Model,
} = require('sequelize');
const { hash } = require('../helpers/bcrypt');
const { validatePassword, validateEmail, validateUsername } = require('../helpers/validation');

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
		username: {
			type: DataTypes.STRING,
			validate: {
				validateUsername,
			},
		},
		email: {
			type: DataTypes.STRING,
			validate: {
				validateEmail,
			},
		},
		password: {
			type: DataTypes.STRING,
			validate: {
				validatePassword
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
