const {Todo} = require('../models');

class TodoController {
    static async show(req, res) {
        const data = await Todo.findAll({where: {UserId: req.userData.id}})
        try {
            return res.status(200).json(data)
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    }
    static async createTodo(req, res) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        try {
            const data = await Todo.create(obj)
            return res.status(201).json(data)
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    }
    static async getIdTodo(req, res) {
        try {
            const data = await Todo.findByPk(req.params.id)
            return res.status(200).json(data)
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    }
    static async updateTodo(req, res) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        try {
            const data = await Todo.update(obj, {where:{id: req.params.id}})
            return res.status(200).json(data)
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    }
    static async deleteTodo(req, res) {
        const data = await Todo.destroy({where:{id: req.params.id}})
        try {
            return res.status(200).json(data)
        } catch(err) {
            return res.status(500).json({message: err.message})
        }
    }
}

module.exports = TodoController