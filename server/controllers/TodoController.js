const { Todo } = require("../models");

class TodoController {
	static async createTodo(req, res) {
		const { title, description, status, due_date } = req.body;
		const UserId = req.user.id;
		try {
			const new_todo = await Todo.create({ title, description, status, due_date, UserId });
			return res.status(201).json(new_todo);
		} catch(err) {
			return next(err);
		}
	}

	static async readTodos(req, res) {
		try {
			const todos = await Todo.findAll();
			return res.status(200).json(todos);
		} catch(err) {
			return next(err);
		}
	}

	static async readTodoById(req, res) {
		const todo_id = +req.params.id;
		try {
			const todo = await Todo.findOne({ where: { id: todo_id } });
			if (!todo) {
				throw { message: `The todo with id ${todo_id} was not found.`, status_code: 400 };
			} else {
				return res.status(200).json(todo);
			}
		} catch(err) {
			return next(err);
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
			return res.status(200).json(updated_todo[1][0]);
		} catch(err) {
			return next(err);
		}
	}

	static async deleteTodoById(req, res) {
		const todo_id = +req.params.id;
		try {
			const deleted_todo = await Todo.findByPk(todo_id);
			const result = await Todo.destroy({ where: { id: deleted_todo.id } });
			return res.status(200).json(deleted_todo);
		} catch(err) {
			return next(err);
		}
	}
}

module.exports = TodoController;