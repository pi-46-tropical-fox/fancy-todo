const { Todo, User } = require('../models')

class Controller {
    // get all todo datas
    static async getAllTodos(req, res, next) {
        try {
            const todoData = await Todo.findAll({include : [ { model : User, attributes: [ 'email', 'id' ] } ]})
            
            let todosWithUserId = todoData.map(todo => {
                if(todo.UserId == req.userData.id) return todo.id
              })


            return res.status(200).json({todoData, todosWithUserId})
        } catch(err) {
            next(err)
        }
    }

    // post new todo
    static async postTodo(req, res, next) {
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
            next(err)
        }
    }

    // get todo by id
    static async getTodoById(req, res, next) {
        try {
            const dataById = await Todo.findByPk(req.params.id)

            if(!dataById) {
                return res.status(404).json({ msg : '404 Not Found' })
            }

            return res.status(200).json(dataById)
        } catch(err) {
            next(err)
        }
    }

    // edit todo data
    static async editTodoById(req, res, next) {
        try {
            const param = {
                title : req.body.title,
                description : req.body.description,
                status : req.body.status,
                due_date : req.body.due_date
            }

            const update = await Todo.update(param, { where : {id : req.params.id}, returning : true})
            
            res.status(200).json(update)
        } catch(err) { 
            next(err)
        }
    }

    // delete todo data
    static async deleteTodo(req, res, next) {
        try {
            await Todo.destroy({where : {id : req.params.id}})

            return res.status(204).json()
        } catch(err) {
            next(err)
        }
    }
}

module.exports = Controller