const {Todo} = require('../models/index')


class TodoController {
    static async getTodoList(req,res) {
        try {
            const todo = await Todo.findAll()
            res.status(200).json(todo)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    static async createTodo(req,res) {
        // const { title,description,status,due_date } = req.body
        console.log(req.header.UserId);
        const params = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        try {
            const createTodo = await Todo.create(params)
            res.status(201).json(createTodo)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    // static createTodo(req,res) {
    //     // const { title,description,status,due_date } = req.body
    //     const params = {
    //         title: req.body.title,
    //         description: req.body.description,
    //         status: req.body.status,
    //         due_date: req.body.due_date
    //     }
    //     Todo.create(params)
    //     .then(result => res.status(201).json(result))
    //     .catch(err => res.status(400).json(err))
    // }

    static async getTodoById(req,res) {
        try {
            console.log(req.params.id);
            const todo = await Todo.findOne({where:{id:req.params.id}})
            console.log(todo);
            res.status(200).json(todo)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    static async updateTodo(req,res) {
        const { title,description,status,due_date } = req.body
        try {
            const update = await Todo.update({ title,description,status,due_date },{where:{id:req.params.id}})
            res.status(201).json(update)
        } catch (err) {
            res.status(400).json(err)
        }
    }
    static async deleteTodo (req,res) {
        try {
            const todo = await Todo.destroy({where:{id:req.params.id}})
            res.status(200).json({message: 'Successfully deleted todo'})
        } catch (err) {
            res.status(400).json(err)
        }
    }
}

module.exports = TodoController