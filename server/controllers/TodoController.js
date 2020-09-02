const { Todo } = require("../models");

class TodoController {
	static async createTodo(req, res) {
		const { title, description, status, due_date } = req.body;
		const UserId = req.user.id;
		try {
			const new_todo = await Todo.create({ title, description, status, due_date, UserId });
			if (!new_todo) {
				return res.status(400).json({ message: err.message });
			} else {
				return res.status(201).json(new_todo);
			}
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async readTodos(req, res) {
		try {
			const todos = await Todo.findAll();
			if (!todos) {
				return res.status(400).json({ message: err.message });
			} else {
				return res.status(200).json(todos);
			}
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async readTodoById(req, res) {
		const todo_id = +req.params.id;
		try {
			const todo = await Todo.findByPk(todo_id);
			if (!todo) {
				return res.status(400).json({ message: err.message });
			} else {
				return res.status(200).json(todo);
			}
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async updateTodoById(req, res) {
		const todo_id = +req.params.id;
		const { title, description, status, due_date } = req.body;
		try {
			const updated_todo = await Todo.update({ title, description, status, due_date }, {
				where: {
					id: todo_id
				},
				returning: true
			});
			if (!updated_todo) {
				return res.status(400).json({ message: err.message });
			} else {
				return res.status(200).json(updated_todo[1][0]);
			}
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}

	static async deleteTodoById(req, res) {
		const todo_id = +req.params.id;
		try {
			const deleted_todo = await Todo.findByPk(todo_id);
			const result = await Todo.destroy({ where: { id: todo_id } });
			if (!result) {
				return res.status(400).json({ message: err.message });
			} else {
				return res.status(200).json(deleted_todo);
			}
		} catch(err) {
			return res.status(500).json({ message: err.message });
		}
	}
}

module.exports = TodoController;