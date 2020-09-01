const { Todo, User } = require("../models");

class TodoController {

  static async addNewTodo(req, res) {
    console.log(+req.userData.id, "this is from todo controller");
    const newTodo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      UserId: +req.userData.id
    };
    try {
      const createdTodo = await Todo.create(newTodo);
      return res.status(201).json(createdTodo);
    } catch(err) {
      if (err.name === "SequelizeValidationError") {
        let errors = [];
        err.errors.forEach((error) => {
          errors.push(error.message);
        });
        return res.status(400).json({ message:"Bad Request", errors: [ err.message ] });
      } else {
        return res.status(500).json({ message:"Internal Server Error", errors: [ err.message ] });
      }
    }
  }

  static async showAllTodos(req, res) {
    console.log(+req.userData.id, "this is from todo controller");
    try {
      const todos = await Todo.findAll();
      return res.status(200).json(todos);
    } catch(err) {
      return res.status(500).json({ message: "Internal Server Error", errors: [ err.message ] });
    }
  }

  static async showTodoById(req, res) {
    try {
      const todo = await Todo.findByPk(+req.params.id);
      return res.status(200).json(todo);
    } catch(err) {
      return res.status(404).json({ message: "Not Found", errors: [ err.message ] });
    }
  }

  static async updateTodo(req, res) {
    try {
      const id = +req.params.id;
      const updatedTodo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date
      };
      const todo = await Todo.update(updatedTodo, {
        where: {
          id: id
        },
        returning: true
      });
      if (todo[0] === 0) {
        return res.status(404).json({ message: "Not Found" });
      }
      return res.status(200).json(todo);
    } catch(err) {
      if (err.name === "SequelizeValidationError") {
        let errors = [];
        err.errors.forEach((error) => {
          errors.push(error);
        });
        return res.status(400).json({ message: "Bad Request", errors: [ err.message ] });
      }
      return res.status(500).json({ message: "Internal Server Error", errors: [ err.message ] });
    }
  }

  static async deleteTodo(req, res) {
    try {
      const id = +req.params.id;
      const destroyedTodo = await Todo.destroy({ 
        where: {
          id: id
        } 
      });
      if (destroyedTodo === 0) {
        return res.status(404).json({ message: "Not Found" });
      }
      return res.status(200).json(destroyedTodo);
    } catch(err) {
      return res.status(500).json({ message: "Internal Server Error", errors: [ err.message ] });
    }
  }

}

module.exports = TodoController;