const { Todo } = require('../models')

class MyTodoController {

    static show(req, res, next) {
        console.log(req.userData, 'ini req.userData')
        Todo.findAll({where: {
            UserId: req.userData.id
        }})
            .then(data => {
                // data.due_date = data.due_date.toISOString()
                return res.status(200).json(data)
            })
            .catch(err => {
                // return res.status(500).json({ message: err.message })
                throw next(err)
            })
    }

    static createTodo(req, res, next) {
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
                return next(err)
            })
    }

    static oneTodo(req, res, next) {
        Todo.findByPk(req.params.idTodo)
        .then(data => {
            return res.status(200).json({data})
        })
        .catch(err => {
            return next(err)
            // return res.status(500).json({ message: err.message })
        })
    }

    static updateTodo(req, res, next) {
        console.log(req.params.idTodo, '<<<<<<<<<<<reqparams')
        let params = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
            Todo.update(params, {
                where: {
                    id: req.params.idTodo
                    }
            })
                .then(data => {
                    return res.status(200).json({data})
                })
                .catch(err => {
                    return next(err)
                    // return res.status(500).json({ message: err.message })
                })
    }

    static completeTodo(req, res, next) {
        let params = {
            status: 'complete'
        }
            Todo.update(params, {
                where: {
                    id: req.params.idTodo
                    }
            })
                .then(data => {
                    return res.status(200).json({data})
                })
                .catch(err => {
                    return next(err)
                    // return res.status(500).json({ message: err.message })
                })
    }

    static deleteTodo(req, res, next) {
        Todo.destroy({ where: { id: req.params.idTodo } })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
                // return res.status(500).json({ message: err.message })
            })
    }

}

module.exports = MyTodoController