const { Todo, User } = require('../models')

class TodoController {
    static addTodo(req, res, next) {
        let todoObj= {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }

        Todo.create(todoObj)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }

    static readAll(req, res, next) {
        Todo.findAll({
            include: [User]
        })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }

    static selectTodo(req, res, next) {
        Todo.findByPk(req.params.id)
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }

    static updateTodo(req, res, next) {
        let todoObj={
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            updatedAt: new Date()
        }
        Todo.update(todoObj, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if(!data) throw{message: 'Todo not found', statusCOde: 404}
                return res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }

    static deleteTodo(req, res, next) {
        Todo.destroy({where: {id: req.params.id}})
            .then(data => {
                if(!data) {
                    return res.status(404).json(data)
                }else {
                    return res.status(200).json(data)
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = TodoController