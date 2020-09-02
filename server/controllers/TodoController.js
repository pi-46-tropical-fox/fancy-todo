const { Todo } = require('../models');

class TodoController {
	static async list(req, res, next) {
		const { id } = req.userData;
		try {
			const todos = await Todo.findAll({ where: { UserId: id } });

			return res.status(200).json(todos);
		} catch (error) {
			next(error);
		}
	}

	static async byId(req, res, next) {
		try {
			const todo = req.todo;

			if (todo) {
				return res.status(200).json(todo);
			} else {
				throw { name: 'notFound' };
			}
		} catch (error) {
			next(error);
		}
	}

	static async create(req, res, next) {
		const { title, description, status, due_date } = req.body;
		const { id } = req.userData;
		try {
			const todo = await Todo.create({ title, description, status, due_date, UserId: id });

			return res.status(201).json(todo);
		} catch (error) {
			next(error);
		}
	}

	static async update(req, res, next) {
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
				throw { name: 'notFound' };
			}
		} catch (error) {
			next(error);
		}
	}

	static async delete(req, res, next) {
		try {
			const todoToDelete = await Todo.findByPk(req.params.id);
			const todo = await Todo.destroy({
				where: { id: req.params.id },
			});

			if (todoToDelete) {
				return res.status(200).json(todoToDelete);
			} else {
				throw { name: 'notFound' };
			}
		} catch (error) {
			next(error);
		}
	}
}

module.exports = TodoController;
