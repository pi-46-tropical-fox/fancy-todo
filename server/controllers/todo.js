'use strict'

const { Todo } = require('../models')

class TodoController{
// Static method for create new "todo"
  static async createTodo(req, res, next) {
    const inputTodo = { 
      title: req.body.title,
      description: req.body.description, 
      status: req.body.status, 
      due_date: req.body.due_date, 
      UserId: req.userData.id
    } 
    try {
      const newTodo = await Todo.create(inputTodo)
      if (!newTodo) {
        throw { message : msg }
      } else {
        return res.status(201).json(newTodo)
      }
    } catch (err) {
      next (err)
    }
  }
// Static method for read all "todos" from database
  static async getTodos(req, res, next) {
    try {
      const showTodos = await Todo.findAll()
      return res.status(200).json(showTodos)
    } catch (err) {
      next (err)
    }
  }
// Static method for read "todo" by requested id
  static async getOne(req, res, next) {
    try {
      const showOne = await Todo.findOne( { where : { id : +req.params.id } })
      if(!showOne) {
        throw { message : 'todo not found', statusCode : 404 }
      } else {
        return res.status(200).json(showOne)
      }
    } catch (err) {
      next (err)
    }
  }
// Static method for update existing "todo" by requested id
  static async editTodo(req, res, next) {
    const { title, description, status, due_date, UserId } = req.body
    try {
      const updateTodo = await Todo.update( 
        { title, description, status, due_date },
        { where : { id : +req.params.id } }
        )
        if (!updateTodo || !updateTodo[0]) {
          throw { message : 'todo not found', statusCode : 404 }
        } else {
          return res.status(200).json(updateTodo)
        }
    } catch (err) {
      next (err)
    }
  } 
// Static method for delete existing "todo" by requested id
  static async removeTodo(req, res, next) {
    try {
      const removeTodo = await Todo.destroy ({ where : { id : +req.params.id } })
      if (!removeTodo) {
        throw { message : 'todo not found', statusCode : 404 }
      } else {
        return res.status(200).json(removeTodo)
      }
    } catch (err) {
      next (err)
    }
  }
}


module.exports = TodoController