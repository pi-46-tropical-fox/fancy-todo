const { Todo } = require('../models')

class TodoController {
    static addTodo(req, res) {
        let todoObj= {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.create(todoObj)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return res.status(400).json(err)
            })
    }

    static readAll(req, res) {
        Todo.findAll()
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }

    static selectTodo(req, res) {
        Todo.findByPk(req.params.id)
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(404).json(err)
            })
    }

    static updateTodo(req, res) {
        let todoObj={
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Todo.update(todoObj, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                console.log(data)
                if(!data) return res.status(404).json(data)
                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json(err)
            })
    }

    static deleteTodo(req, res) {
        Todo.destroy({where: {id: req.params.id}})
            .then(data => {
                if(!data) {
                    return res.status(404).json(data)
                }else {
                    return res.status(200).json(data)
                }
            })
            .catch(err => {
                return res.status(500).json(err)
            })
    }
}

module.exports = TodoController