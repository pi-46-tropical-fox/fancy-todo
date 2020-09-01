const { Todo, User } = require("../models");

class TodoController {

  static async addNewTodo(req, res, next) {
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
      console.log("<<<< error in addNewTodo TodoController");
      return next(err);
    }
  }

  static async showAllTodos(req, res, next) {
    console.log(+req.userData.id, "this is from todo controller");
    try {
      const todos = await Todo.findAll();
      return res.status(200).json(todos);
    } catch(err) {
      console.log("<<<< error in showAllTodos TodoController");
      return next(err);
    }
  }

  static async showTodoById(req, res, next) {
    try {
      const todo = await Todo.findByPk(+req.params.id);
      return res.status(200).json(todo);
    } catch(err) {
      return next(err);
    }
  }

  static async updateTodo(req, res, next) {
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
      return res.status(200).json(todo[1]);
    } catch(err) {
      return next(err);
    }
  }

  static async deleteTodo(req, res, next) {
    try {
      const id = +req.params.id;
      const destroyedTodo = await Todo.destroy({ 
        where: {
          id: id
        } 
      });
      return res.status(200).json(destroyedTodo);
    } catch(err) {
      return next(err);
    }
  }

}

module.exports = TodoController;