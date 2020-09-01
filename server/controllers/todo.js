'use strict'

const { Todo } = require('../models')

class TodoController{
// Static method for create new "todo"
  static async createTodo(req, res) {
    const { title, description, status, due_date } = req.body
    try {
      const newTodo = await Todo.create({ title, description, status, due_date })
      if (!newTodo) {
        return res.status(400).json({ message : msg })
      } else {
        console.log(newTodo);
        return res.status(200).json(newTodo)
      }
    } catch (err) {
      return res.status(500).json({ message : err.message })
    }
  }
// Static method for read all "todos" from database
  static async getTodos(req, res) {
    try {
      const showTodos = await Todo.findAll()
      return res.status(200).json(showTodos)
    } catch (err) {
      return res.status(500).json({ message : err.message })
    }
  }
// Static method for read "todo" by requested id
  static async getOne(req, res) {
    try {
      const showOne = await Todo.findOne( { where : { id : +req.params.id } })
      // console.log(showOne);
      if(!showOne) {
        return res.status(404).json({ message : 'todo not found' })
      } else {
        return res.status(200).json(showOne)
      }
    } catch (err) {
      return res.status(500).json({ message : err.message })
    }
  }
// Static method for update existing "todo" by requested id
  static async editTodo(req, res) {
    const { title, description, status, due_date } = req.body
    try {
      const updateTodo = await Todo.update( 
        { title, description, status, due_date },
        { where : { id : +req.params.id } }
        )
        console.log(updateTodo);
        if (!updateTodo || updateTodo[0] === 0) {
          return res.status(404).json({ message : 'todo not found' })
        } else {
          console.log('HIT');
          return res.status(200).json(updateTodo)
        }
    } catch (err) {
      return res.status(500).json({ message : err.message })
    }
  } 
// Static method for delete existing "todo" by requested id
  static async removeTodo(req, res) {
    try {
      const removeTodo = await Todo.destroy ({ where : { id : +req.params.id } })
      console.log(removeTodo);
      if (!removeTodo) {
        return res.status(404).json({ message : 'todo not found' })
      } else {
        return res.status(200).json(removeTodo)
      }
    } catch (err) {
      return res.status(500).json({ message : err.message })
    }
  }
}


module.exports = TodoController