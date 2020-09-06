const {Todo} = require('../models')

class TodoController {
    static createTodo(req, res, next) {
        let todoObj = {
            title: req.body.title,
            description: req.body.description,
            status: 'incomplete',
            due_date: req.body.due_date,
            UserId: req.userData.id
        }

        Todo.create(todoObj)
        .then(todo => {
            return res.status(201).json(todo)
        })
        .catch(err => {
            if (err.errors) {
                let errors = []
                for (let i = 0; i < err.errors.length; i++) {
                    errors.push(err.errors[i].message)
                }
                return res.status(400).json({errors})
            } else {
                return next(err)
            }
        })
    }

    static showTodo(req, res, next) {
        Todo.findAll()
        .then(todo => {
            return res.status(200).json(todo)
        })
        .catch(err => {
            return next(err)
        })
    }

    static showTodoById(req, res, next) {
        Todo.findByPk(req.params.id)
        .then(todo => {
            if (!todo) {
                throw {message: 'Todo not found', statusCode: 404}
            } else {
                return res.status(200).json(todo)
            }
        })
        .catch(err => {
            return next(err)
        })
    }

    static updateTodo(req, res, next) {
        let todoUpdate = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.update(todoUpdate, {where: {id: req.params.id}})
        .then(todo => {
            // console.log(todo, '<<<<< ini di Todo Controller');
            return res.status(200).json(todoUpdate)
        })
        .catch(err => {
            if (err.errors) {
                let errors = []
                for (let i = 0; i < err.errors.length; i++) {
                    errors.push(err.errors[i].message)
                }
                return next(err)
            } else {
                return next(err)
            }
        })
    }

    static deleteTodo(req, res) {
        Todo.destroy({
            where: {id:req.params.id}
        })
        .then(result => {
            console.log(result);
            if (result === 1) {
                return res.status(200).json({message: 'Succesfully delete todo'})
            } else {
                // return res.status(400).json({message: 'Failed delete todo'})
                throw {message: 'Failed delete todo', statusCode: 400}
            }
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = TodoController