const { Todo } = require('../models')

class TodoController {

    static show(req, res) {
        Todo.findAll()
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(500).json({ message: err.message })
            })
    }

    static createTodo(req, res) {
        console.log(req.userData, 'ini req.userData')
        let params = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        Todo.create(params)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return res.status(500).json({ message: err.message })
            })
    }

    static updateTodo(req, res) {
        let params = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(params, {
            where: {
                id: req.params.todoId
                }
        })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(500).json({ message: err.message })
            })
    }

    static deleteTodo(req, res) {
        Todo.destroy({ where: { id: req.params.todoId } })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(500).json({ message: err.message })
            })
    }

}

module.exports = TodoController