const { Todo, User } = require('../models')

class Controller {
    // get all todo datas
    static async getAllTodos(req, res) {
        try {
            const todoData = await Todo.findAll({include : [ { model : User, attributes: [ 'email', 'id' ] } ]})
            
            let todosWithUserId = todoData.map(todo => {
                if(todo.UserId == req.userData.id) return todo.id
              })

            return res.status(200).json({todoData, todosWithUserId})
        } catch(err) {
            return res.status(500).json({ msg : 'Internal Server Error' })
        }
    }

    // post new todo
    static async postTodo(req, res) {
        try {
            const param = {
                title : req.body.title,
                description : req.body.description,
                status : false,
                due_date : req.body.due_date,
                UserId : req.userData.id
            }

            const postTodo = await Todo.create(param, {returning : true})
    
            return res.status(201).json(postTodo)
        } catch(err) {
            if(err.name == 'SequelizeValidationError') {
                let messages = err.errors.map(err => err.message)
                
                return res.status(400).json(messages)
            }
            return res.status(500).json({ msg : 'Internal Server Error'})
        }
    }

    // get todo by id
    static async getTodoById(req, res) {
        try {
            const dataById = await Todo.findByPk(req.params.id)

            if(!dataById) {
                return res.status(404).json({ msg : '404 Not Found' })
            }

            return res.status(200).json(dataById)
        } catch(err) {
            return res.status(500).json({ msg : 'Internal Server Error' })
        }
    }

    // edit todo data
    static async editTodoById(req, res) {
        try {
            const param = {
                title : req.body.title,
                description : req.body.description,
                status : req.body.status,
                due_date : req.body.due_date
            }

            const dataEdit = await Todo.update(param, { where : {id : req.params.id}, returning : true})

            if(!dataEdit[0]) {
                return res.status(404).json({ msg : '404 Not Found' })
            } else {
                return res.status(200).json(dataEdit[1][0])
            }

        } catch(err) {
            if(err.name == 'SequelizeValidationError') {
                let messages = err.errors.map(err => err.message)
                
                return res.status(400).json(messages)
            }

            return res.status(500).json({ msg : 'Internal Server Error'})
        }
    }

    // delete todo data
    static async deleteTodo(req, res) {
        try {
            await Todo.destroy({where : {id : req.params.id}})

            return res.status(204).json()
        } catch(err) {
            return res.status(500).json({ msg : 'Internal Server Error'})
        }
    }
}

module.exports = Controller