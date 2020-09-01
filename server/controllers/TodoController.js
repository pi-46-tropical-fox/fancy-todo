const {Todo} = require('../models');

class TodoController {

  static createTodo(req, res, next) {
    // console.log(req.userData, 'ini di create book');
    var todo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date,
      // UserId: req.userData.id
    }
    Todo.create(todo)
    .then(todo => {
      return res.status(201).json(todo)
    })
    .catch(err => {
      return next(err)
    })
  }

  static getTodos(req, res, next) {
    Todo.findAll()
    .then(todos => {
      return res.status(200).json(todos)
    })
    .catch(err => {
      return next(err)
    })
  }

  static getTodoById(req, res, next) {
      Todo.findOne({
        where: {id: req.params.id}
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        return next(err)
      })
  }

  static updateTodo(req, res, next) {
    const { title, description, status, due_date } = req.body;
    Todo.update(
      {
        title, 
        description,
        status,
        due_date
      },
      {
        where: {id:req.params.id}
      }
    )
    .then(todo => {
      res.status(201).json(todo)
    })
    .catch(err => {
      return next(err)
    })
  }

  static deleteTodo(req, res, next) {
    Todo.destroy({
      where:{id: req.params.id}
    })
    .then(result => {
      if(!result) {
        throw {message: "Failed to delete", statusCode: 400}
      } else {
        res.status(200).json({message: "successfully delete"})
      }
    })
    .catch(err => {
      return next(err)
    })
  }
}

module.exports = TodoController;