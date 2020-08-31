const { Todo } = require('../models')

class TodoController {
    static async readAll(req, res){
        try {
            let todos = await Todo.findAll()

            res.status(200).json(todos)
        } catch (err) {
            res.status(500).send(err)
        }
    }
    
    static async create(req, res){
        try {
            // assume req.body has title, description, status, and due_date
            let newTodo = await Todo.create(req.body)

            res.status(201).json(newTodo)
        } catch (err) {
            res.status(500).send(err)
        }
    }
    
    static async update(req, res){
        try {
            let todo = await Todo.update(req.body, {
                where: { id: req.params.id }
            })

            res.status(200).json(todo)
        } catch (err) {
            res.status(500).send(err)
        }
    }
    
    static async delete(req, res){
        try {
            await Todo.delete({
                where: { id: req.params.id }
            })

            res.status(200).json({msg: `Todo with ID ${req.params.id} was successfully deleted`})
        } catch (err) {
            res.status(500).send(err)
        }
    }
}

module.exports = TodoController