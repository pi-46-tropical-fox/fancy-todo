'use strict'

const { Todo } = require('../models')

const authorizationTodo = async (req, res, next) => {
  
  try {
    const ownerTodo = await Todo.findByPk(+req.params.id)
    console.log(ownerTodo);
    if (ownerTodo.UserId == req.userData.id) {
      next()
    } else {
      return res.status(403).json({ message: "Forbidden access" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}


module.exports = { authorizationTodo }