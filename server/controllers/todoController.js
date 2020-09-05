const {Todo} = require('../models');

class TodoController {
    static async show(req, res, next) {
        const data = await Todo.findAll({where: {UserId: req.userData.id}})
        try {
            return res.status(200).json(data)
        } catch(err) {
            return next(err)
        }
    }
    static async createTodo(req, res, next) {
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
            return next(err)
        }
    }
    static async getIdTodo(req, res, next) {
        try {
            const data = await Todo.findByPk(req.params.id)
            return res.status(200).json(data)
        } catch(err) {
            return next(err)
        }
    }
    static async updateTodo(req, res) {
        const { id } = req.params
        const { title, description, status, due_date } = req.body
        try {
            const data = await Todo.update({ title, description, status, due_date }, {where:{ id }})
            console.log(data)
            if (!data[0]) {
                return res.status(400).json({message: 'Todo not found'})
            } else {
                return res.status(200).json(data)
            }
        } catch(err) {
            return next(err)
        }
    }
    static async deleteTodo(req, res) {
        const data = await Todo.destroy({where:{id: req.params.id}})
        try {
            return res.status(200).json(data)
        } catch(err) {
            return next(err)
        }
    }
}

module.exports = TodoController