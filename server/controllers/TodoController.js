const { Todo } = require('../models');

class TodoController {
	static async list(req, res) {
		try {
			const todos = await Todo.findAll();

			return res.status(200).json(todos);
		} catch (error) {
			return res.status(500).json({ message: 'Internal server error' });
		}
	}

	static async byId(req, res) {
		try {
			const todo = await Todo.findOne({ where: { id: req.params.id } });

			if (todo) {
				return res.status(200).json(todo);
			} else {
				const notFound = new Error('Error todo not found');
				notFound.name = '404';
				throw notFound;
			}
		} catch (error) {
			if (error.name === '404') {
				return res.status(404).json({ message: error.message });
			} else {
				return res.status(500).json(error);
			}
		}
	}

	static async create(req, res) {
		const { title, description, status, due_date } = req.body;
		const { id } = req.userData;
		try {
			const todo = await Todo.create({ title, description, status, due_date, UserId: id });

			return res.status(201).json(todo);
		} catch (error) {
			if (error.name === 'SequelizeValidationError') {
				return res.status(400).json({
					validation_errors: error.errors.map(err => {
						return {
							name: err.validatorKey,
							message: err.message,
						};
					}),
				});
			} else {
				return res.status(500).json({ message: 'Internal server error' });
			}
		}
	}

	static async update(req, res) {
		const { title, description, status, due_date } = req.body;
		try {
			const todo = await Todo.update(
				{ title, description, status, due_date },
				{
					where: {
						id: req.params.id,
					},
					returning: true,
				}
			);

			if (todo[0]) {
				return res.status(200).json(todo[1][0]);
			} else {
				const notFound = new Error('Error todo not found');
				notFound.name = '404';
				throw notFound;
			}
		} catch (error) {
			if (error.name === 'SequelizeValidationError') {
				return res.status(400).json({
					validation_errors: error.errors.map(err => {
						return {
							name: err.validatorKey,
							message: err.message,
						};
					}),
				});
			} else if (error.name === '404') {
				return res.status(404).json({ message: error.message });
			} else {
				return res.status(500).json({ message: 'Internal server error' });
			}
		}
	}

	static async delete(req, res) {
		try {
			const todoToDelete = await Todo.findByPk(req.params.id);
			const todo = await Todo.destroy({
				where: { id: req.params.id },
			});

			if (todoToDelete) {
				return res.status(200).json(todoToDelete);
			} else {
				const notFound = new Error('Error todo not found');
				notFound.name = '404';
				throw notFound;
			}
		} catch (error) {
			if (error.name === '404') {
				return res.status(404).json({ message: error.message });
			} else {
				return res.status(500).json({ message: 'Internal server error' });
			}
		}
	}
}

module.exports = TodoController;
