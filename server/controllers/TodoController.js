const { Todo, User } = require("../models");

// Mailgun API
const api_key = `${process.env.MAILGUN_API_KEY}`;
const domain = `${process.env.MAILGUN_DOMAIN}`;
const mailgun = require("mailgun-js")({apiKey: api_key, domain: domain});

class TodoController {
	static async createTodo(req, res) {
		const { title, description, due_date } = req.body;
		const UserId = req.user.id;
		try {
			const new_todo = await Todo.create({ title, description, due_date, UserId });
			const user = await User.findByPk(UserId);
			const data = {
				from: `Fancy Todo <alf.tirta@gmail.com>`,
				to: `${user.email}`,
				subject: `New Todo : ${new_todo.title}`,
				text: `
Hello ${user.username}, here is your new todo :
 - Title : ${new_todo.title}
 - Description : ${new_todo.description}
 - Status : ${new_todo.status}
 - Due Date : ${new_todo.due_date_standard_format}`
			};
			mailgun.messages().send(data, (error, body) => {
				if (error) console.log(error);
				else console.log(body);
			});
			return res.status(201).json(new_todo);
		} catch(err) {
			return next(err);
		}
	}

	static async readTodos(req, res) {
		try {
			const todos = await Todo.findAll({ include: [ User ] });
			return res.status(200).json(todos);
		} catch(err) {
			return next(err);
		}
	}

	static async readTodosByUserId(req, res) {
		const UserId = +req.params.id;
		try {
			const user = await User.findOne({ where: { id: UserId } });
			if (!user) {
				throw { message: `The user with id ${UserId} was not found.`, status_code: 400 };
			} else {
				const todos = await Todo.findAll({ where: { UserId } });
				return res.status(200).json(todos);
			}
		} catch(err) {
			return next(err);
		}
	}

	static async updateTodoByTodoId(req, res) {
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
				throw { message: `The todo with id ${todo_id} was not found.`, status_code: 400 };
			} else {
				return res.status(200).json(updated_todo);
			}
			return res.status(200).json(updated_todo[1][0]);
		} catch(err) {
			return next(err);
		}
	}

	static async deleteTodoByTodoId(req, res) {
		const todo_id = +req.params.id;
		try {
			const deleted_todo = await Todo.findByPk(todo_id);
			if (!deleted_todo) {
				throw { message: `The todo with id ${todo_id} was not found.`, status_code: 400 };
			} else {
				const result = await Todo.destroy({ where: { id: deleted_todo.id } });
				return res.status(200).json(deleted_todo);
			}
		} catch(err) {
			return next(err);
		}
	}
}

module.exports = TodoController;