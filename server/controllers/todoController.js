const {Todo} = require('../models');

class TodoController {
    
    static async create(req,res) {
        const {title,description,status,due_date} = req.body
        const UserId = req.userData.id // dari token di authentication

        try {
            let create = await Todo.create({
                title,description,status,due_date,UserId
            })
            res.status(201).json(create)
        } catch (err) {
            if(err.errors[0].type === 'Validation error') {
                res.status(400).json({message:err.errors[0].message}) // sequelize
            } else {
                res.status(500).json({message:err.message}) // postman
            }
        }
    }

    static async showAll(req,res) {
    
        try {
            let show = await Todo.findAll()
            res.status(200).json(show)
        } catch (err) {
            res.status(500).json({message:err.message})
        }
    }

    static async showId(req,res) {
        
        try {
            let todo = await Todo.findByPk(req.params.id)
            if(todo) {
                res.status(200).json(todo)
            } else {
                res.status(404).json({message:"Data Not Found"})
            }
            
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }

    static async updateId(req,res) {
        const {title,description,status,due_date} = req.body
        const id = req.params.id

        try {
            let data = await Todo.update({
                title,description,status,due_date
            }, {
                where: {
                    id: id
                }
            })
            let todoData = await Todo.findByPk(id)
            if(todoData) {
                res.status(200).json(todoData)
            } else {
                res.status(404).json({message: "Not Found"})
            }
        } catch (err) {
            if(err.errors[0].type === 'Validation error') {
                res.status(400).json({message:err.errors[0].message})
            } else {
                res.status(500).json({message:err.message})
            }
        }
    }

    static async delete(req,res) {
        try {
           let data = await Todo.findByPk(req.params.id)
           if(data) {
               await Todo.destroy({where: {id: req.params.id}})
               res.status(200).json(data)
           } else {
               res.status(404).json({message:"Data Not found"})
           }
        } catch (err) {
            res.status(500).json({message:err.message})
        }
    }
}

module.exports = TodoController
