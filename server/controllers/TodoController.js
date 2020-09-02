const {Todo} = require('../models')

class TodoController {
    static async showTodo (req, res, next) {
        try {
            const todos = await Todo.findAll({
                where: {
                    UserId : req.user.id
                }
            })
            return res.status(200).json(todos)
        } catch(err) {
            return next(err)
        }
    }
    static async createTodo (req, res, next) {
        let obj = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            status: 'incomplete',
            due_date: req.body.due_date.trim(),
            UserId: req.user.id
        }
        try {
            const todo = await Todo.create(obj)
            return res.status(201).json(todo)
        } catch(err) {
            return next(err)
        }
    }
    static async findTodoById (req, res, next) {
        try {
            const todo = await Todo.findOne({
                where: {
                    id : +req.params.id
                }
            })
            if(!todo){
                throw {name: `TodoNotFound`}
            }else{
                return res.status(200).json(todo)
            }  
        } catch(err) {
            return next(err)
        }
    }
    static async updateTodo (req, res, next) {
        let obj = {
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            status: req.body.status.trim(),
            due_date: req.body.due_date.trim(),
            updatedAt: new Date()
        }
        try {
            const todo = await Todo.update(obj, {
                where: {
                    id : +req.params.id
                },
                returning : true
            })
            if(!todo[1][0]){
                throw {name: `TodoNotFound`}
            }else{
                return res.status(200).json(todo[1][0])
            } 
        } catch(err) {
            return next(err)
        }
    }
    static async deleteTodo (req, res, next) {
        try {
            const todo = await Todo.findOne({
                where: {
                    id: +req.params.id
                }
            })
            if(!todo){
                throw {name: `TodoNotFound`}
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
                    return next(err)
                })
            }
        } catch(err) {
            return next(err)
        }
    }
}

module.exports = TodoController