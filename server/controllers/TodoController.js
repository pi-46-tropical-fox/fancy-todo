const { Todo } = require("../models");

class TodoController {
	static createTodo(req, res) {
		const new_todo = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date
		}
		Todo.create(new_todo)
			.then(todo => {
				return res.status(201).json(todo);
			})
			.catch(err => {
				return res.status(500).json({ message: err.message });
			});
	}

	static getTodos(req, res) {
		Todo.findAll()
			.then(todos => {
				return res.status(200).json(todos);
			})
			.catch(err => {
				return res.status(500).json({ message: err.message });
			});
	}

	static getTodoById(req, res) {
		const todo_id = +req.params.id;
		Todo.findByPk(todo_id)
			.then(todo => {
				return res.status(200).json(todo);
			})
			.catch(err => {
				return res.status(500).json({ message: err.message });
			});
	}

	static updateTodoById(req, res) {
		const todo_id = +req.params.id;
		const updated_todo = {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			due_date: req.body.due_date
		}
		Todo.update(updated_todo, {
			where: {
				id: todo_id
			},
			returning: true
		})
			.then(todo => {
				return res.status(200).json(todo[1][0]);
			})
			.catch(err => {
				return res.status(500).json({ message: err.message });
			});
	}

	static deleteTodoById(req, res) {
		const todo_id = +req.params.id;
		let deleted_todo;
		Todo.findByPk(todo_id)
			.then(todo => {
				deleted_todo = todo;
				return Todo.destroy({
					where: {
						id: todo_id
					}
				})
			})
			.then(() => {
				return res.status(200).json(deleted_todo);
			})
			.catch(err => {
				return res.status(500).json({ message: err.message });
			});
	}
}

module.exports = TodoController;