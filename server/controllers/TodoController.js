const { Todo } = require('../models');

class TodoController {
	static async getAllTodos(req, res) {
		const todos = await Todo.findAll({
			where: {
				UserId: req.userData.id,
			},
		});

		res.status(200).json(todos);
	}

	static getTodoById(req, res) {
		res.status(200).json(req.todo);
	}

	static async createTodo(req, res) {
		const data = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: new Date(req.body.due_date),
			UserId: req.userData.id,
		};

		const insertRes = await Todo.create(data);

		res.status(201).json(insertRes);
	}

	static async deleteTodoById(req, res) {
		const { id } = req.params;

		await Todo.destroy({
			where : {
				id
			}
		})

		res.status(200);
	}

	static async updateTodoById(req, res) {
		const data = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: new Date(req.body.due_date)
		};

		const { id } = req.params;

		await Todo.update(data, {
			where : {
				id
			}
		})

		res.status(200);
	}
}

module.exports = TodoController;
