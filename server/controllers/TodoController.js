const {Todo} = require('../models')

class TodoController {
    static async showBook (req, res) {
        try {
            const todos = await Todo.findAll()
            return res.status(200).json(todos)
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    }
    static async createTodo (req, res) {
        try {
            let obj = {
                title: req.body.title.trim(),
                description: req.body.description.trim(),
                status: 'incomplete',
                due_date: req.body.due_date.trim(),
                UserId: req.user.id
            }
            const todo = await Todo.create(obj)
            return res.status(201).json(todo)
        } catch(err) {
            if(err.name === 'SequelizeValidationError'){
                let errors = []
                for(const el of err.errors){
                    errors.push(el.message)
                }
                return res.status(400).json({message: errors})
            }else{
                return res.status(500).json({message: err.message})
            } 
        }
    }
    static async findTodoById (req, res) {
        try {
            const todo = await Todo.findOne({
                where: {
                    id : +req.params.id
                }
            })
            if(!todo){
                return res.status(404).json({message: `Todo's id not found`})
            }else{
                return res.status(200).json(todo)
            }  
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    }
    static async updateTodo (req, res) {
        try {
            let obj = {
                title: req.body.title.trim(),
                description: req.body.description.trim(),
                status: req.body.status.trim(),
                due_date: req.body.due_date.trim(),
                updatedAt: new Date()
            }
            const todo = await Todo.update(obj, {
                where: {
                    id : +req.params.id
                },
                returning : true
            })
            if(!todo[1][0]){
                return res.status(404).json({message: `Todo's id not found`})
            }else{
                return res.status(200).json(todo[1][0])
            } 
        } catch(err) {
            if(err.name === 'SequelizeValidationError'){
                let errors = []
                for(const el of err.errors){
                    errors.push(el.message)
                }
                return res.status(400).json({message: errors})
            }else{
                return res.status(500).json({message: err.message})
            } 
        }
    }
    static async deleteTodo (req, res) {
        try {
            const todo = await Todo.findOne({
                where: {
                    id: +req.params.id
                }
            })
            if(!todo){
                return res.status(404).json({message: `Todo's id not found`})
            }else{
                Todo.destroy({
                    where: {
                        id: +req.params.id
                    }
                })
                .then(data => {
                    return res.status(200).json(todo)
                })
                .catch(err => {
                    return res.status(500).json({message: err.message})
                })
            }
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    }
}

module.exports = TodoController