const {Todo} = require('../models');

class TodoController {
  static getTodos(req, res) {
    Todo.findAll()
    .then(todos => {
      return res.status(200).json(todos)
    })
    .catch(err => {
      return res.status(500).json({message: err.message})
    })
  }

  static createTodo(req, res) {
    var todo = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      due_date: req.body.due_date
    }
    Todo.create(todo)
    .then(todo => {
      return res.status(201).json(todo)
    })
    .catch(err => {
      return res.status(500).json({message: err.message})
    })
  }

  static getTodoById(req, res) {
      Todo.findOne({
        where: {id: req.params.id}
      })
      .then(todo => {
        res.status(200).json(todo)
      })
      .catch(err => {
        res.status(400).json({message: err.message})
      })
  }

  static updateTodo(req, res) {
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
      res.status(400).json({message: err.message})
    })
  }

  static deleteTodo(req, res) {
    Todo.destroy({
      where:{id: req.params.id}
    })
    .then(todo => {
      res.status(200).json(todo)
    })
    .catch(err => {
      res.status(400).json({message: err.message})
    })
  }
}

module.exports = TodoController;