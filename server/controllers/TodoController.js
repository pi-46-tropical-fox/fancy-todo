const { Todo } = require('../models')

class TodoController {
    static async readAll(req, res, next){
        try {
            let todos = await Todo.findAll({ where: { UserId: req.userData.id } })

            res.status(200).json(todos)
        } catch (error) {
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
            return next(err)
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
            return next(err)
        }
    }
    
    static async delete(req, res, next){
        try {
            let todo = await Todo.findByPk(req.params.id)
            
            if(todo){
                let isAuthorized = req.userData.id === todo.UserId

                if(isAuthorized){
                    await Todo.destroy({
                        where: { id: req.params.id }
                    })
        
                    res.status(200).json({msg: `Todo with ID ${req.params.id} was successfully deleted`})
                } else {
                    throw { code: 403, msg: 'Hey, you! The unauthorized thief! What are you doing here?' }
                }
            } else {
                throw { code: 404, msg: `Sorry, but Todo with ID ${req.params.id} was not found.` }
            }
        } catch (err) {
            return next(err)
        }
    }
}

module.exports = TodoController