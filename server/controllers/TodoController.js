const {Todo} = require('../models')

class TodoController {
    static showBook (req, res) {
        Todo.findAll()
        .then(todos => {
            return res.status(200).json(todos)
        })
        .catch(err => {
            return res.status(500).json({message: err.message})
        })
    }
    static createTodo (req, res) {
        let obj = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            status: req.body.status.trim(),
            due_date: req.body.due_date.trim()
        }
        Todo.create(obj)
        .then(todo => {
            return res.status(201).json(todo)
        })
        .catch(err => {
            if(err.name === 'SequelizeValidationError'){
                let errors = []
                for(const el of err.errors){
                    errors.push(el.message)
                }
                return res.status(400).json({message: errors})
            }else{
                return res.status(500).json({message: err.message})
            }            
        })
    }
    static findTodoById (req, res) {
        Todo.findOne({
            where: {
                id: +req.params.id
            }
        })
        .then(todo => {
            if(!todo){
                return res.status(404).json({message: `Todo's id not found`})
            }else{
                return res.status(200).json(todo)
            }            
        })
        .catch(err => {
            return res.status(500).json({message: err.message})
        })
    }
    static updateTodo (req, res) {
        let obj = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            status: req.body.status.trim(),
            due_date: req.body.due_date.trim(),
            updatedAt: new Date()
        }
        Todo.update(obj, {
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then(todo => {
            if(!todo[1][0]){
                return res.status(404).json({message: `Todo's id not found`})
            }else{
                return res.status(200).json(todo[1][0])
            }  
        })
        .catch(err => {
            if(err.name === 'SequelizeValidationError'){
                let errors = []
                for(const el of err.errors){
                    errors.push(el.message)
                }
                return res.status(400).json({message: errors})
            }else{
                return res.status(500).json({message: err.message})
            } 
        })
    }
    static deleteTodo (req, res) {
        Todo.findOne({
            where: {
                id: +req.params.id
            }
        })
        .then(todo => {
            if(!todo){
                return res.status(404).json({message: `Todo's id not found`})
            }else{
                let temp = todo
                Todo.destroy({
                    where: {
                        id: +req.params.id
                    }
                })
                .then(data => {
                    return res.status(200).json(temp)
                })
                .catch(err => {
                    return res.status(500).json({message: err.message})
                })    
            }            
        })
        .catch(err => {
            return res.status(500).json({message: err.message})
        })
    }

}

module.exports = TodoController