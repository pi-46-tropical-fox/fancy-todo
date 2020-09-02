const { Todo } = require('../models')

class TodoController {
    static async readAll(req, res, next){
        try {
            let todos = await Todo.findAll()

            res.status(200).json(todos)
        } catch (error) {
            err = {
                code: 500,
                msg: `Oops! Something wrong happened on our end. Don't worry, we'll get this thing done fast.`
            }

            return next(err)
        }
    }
    
    static async create(req, res, next){
        try {
            // assume req.body has title, description, status, and due_date
            req.body.UserId = req.userData.id
            let newTodo = await Todo.create(req.body)


            res.status(201).json(newTodo)
        } catch (err) {
            let error = {
                code: 400,
                msg: []
            }

            switch(err.name){
                case 'SequelizeValidationError':
                    err.errors.forEach(e => {
                        error.msg.push(`${e.path}: ${e.message}`)
                    })
                break
                case 'SequelizeUniqueConstraintError':
                    err.errors.forEach(e => {
                        error.msg.push(`${e.type}: ${e.message}`)
                    })
                break
            }
            
            return next(error)
        }
    }
    
    static async update(req, res, next){
        try {
            let todo = await Todo.findByPk(req.params.id)

            let isAuthorized = req.userData.id === todo.UserId

            if(isAuthorized){
                let todo = await Todo.update(req.body, {
                    where: { id: req.params.id }
                })
    
                res.status(200).json(todo)
            } else {
                throw { code: 403, msg: 'Hey, you! The unauthorized thief! What are you doing here?' }
            }
        } catch (err) {
            let error = {}

            if(!err.code){
                error.code = 400
            } else {
                error.code = err.code
            }

            if(!err.msg){
                error.msg = []
                
                switch(err.name){
                    case 'SequelizeValidationError':
                        err.errors.forEach(e => {
                            error.msg.push(`${e.path}: ${e.message}`)
                        })
                    break
                    case 'SequelizeUniqueConstraintError':
                        err.errors.forEach(e => {
                            error.msg.push(`${e.type}: ${e.message}`)
                        })
                    break
                }
            } else {
                error.msg = [err.msg]
            }
                        
            return next(error)
        }
    }
    
    static async delete(req, res, next){
        try {
            await Todo.delete({
                where: { id: req.params.id }
            })

            res.status(200).json({msg: `Todo with ID ${req.params.id} was successfully deleted`})
        } catch (err) {
            let error = {
                code: 400,
                msg: []
            }

            return next(error)
        }
    }
}

module.exports = TodoController