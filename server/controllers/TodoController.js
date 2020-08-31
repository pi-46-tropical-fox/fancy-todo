const { Todo } = require('../models')

class Controller {
    static async getAllTodos(req, res) {
        try {
            const todoData = await Todo.findAll()

            return res.status(200).json(todoData)
        } catch(err) {
            return res.status(500).json({ msg : 'Invalid Server Error' })
        }
    }

    static async postTodo(req, res) {
        try {
            const param = {
                title : req.body.title,
                description : req.body.description,
                status : req.body.status,
                due_date : req.body.due_date
            }
    
            await Todo.create(param)
    
            return res.status(201).json(param)
        } catch(err) {
            if(err.name == 'SequelizeValidationError') {
                let messages = err.errors.map(err => err.message)
                
                return res.status(400).json(messages)
            }
            return res.status(500).json({ msg : 'Invalid Server Error'})
        }
    }

    static async getTodoById(req, res) {
        try {
            const dataById = await Todo.findByPk(req.params.id)

            return res.status(200).json(dataById)
        } catch(err) {
            return res.status(500).json({ msg : 'Invalid Server Error' })
        }
    }

    static async editTodoById(req, res) {
        try {
            const param = {
                title : req.body.title,
                description : req.body.description,
                status : req.body.status,
                due_date : req.body.due_date
            }

            await Todo.update(param, {where : {id : req.params.id}})

            return res.status(200).json(param)
        } catch(err) {
            return res.status(500).json({ msg : 'Invalid Server Error'})
        }
    }

    static async deleteTodo(req, res) {
        try {
            await Todo.destroy({where : {id : req.params.id}})

            return res.status(204).json()
        } catch(err) {
            return res.status(500).json({ msg : 'Invalid Server Error'})
        }
    }
}

module.exports = Controller