const { Todo } = require('../models')
const axios = require('axios')
const pasteeApiKey = process.env.PASTEE_API_KEY

class TodoController {
    static async readAll(req, res, next){
        try {
            let todos = await Todo.findAll({ where: { UserId: req.userData.id }, order: [['id', 'DESC']] })

            res.status(200).json(todos)
        } catch (error) {
            return next(err)
        }
    }

    static async readOne(req, res, next){
        try {
            let todoData = await Todo.findByPk(req.params.id)

            res.status(200).json(todoData)
        } catch (e) {
            return next(e)
        }
    }
    
    static async create(req, res, next){
        try {
            let newTodo = {
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date,
                UserId: req.userData.id,
            }

            if(req.body.code){
                let data = {
                    title: req.body.title,
                    description: req.body.description,
                    code: req.body.code
                }

                newTodo.PasteeId = await TodoController.addPastee(data, next)
                console.log(newTodo);
            }

            let todo = await Todo.create(newTodo)

            res.status(201).json(todo)
        } catch (err) {
            return next(err)
        }
    }
    
    static async update(req, res, next){
        try {
            let todo = await Todo.update(req.body, {
                where: { id: req.params.id }
            })

            res.status(200).json(todo)
        } catch (err) {   
            return next(err)
        }
    }
    
    static async delete(req, res, next){
        try {
            let todo = await Todo.findByPk(req.params.id)
            
            if(todo){
                if(todo.PasteeId) await TodoController.deletePasteeId(todo.PasteeId)

                await Todo.destroy({
                    where: { id: req.params.id }
                })
        
                res.status(200).json({msg: `Todo with ID ${req.params.id} was successfully deleted`})
            } else {
                throw { code: 404, msg: `Sorry, but Todo with ID ${req.params.id} was not found.` }
            }
        } catch (err) {
            return next(err)
        }
    }

    static async addPastee(data, next){
        try {
            let pastee = {
                method: "POST",
                url: "https://api.paste.ee/v1/pastes",
                data: {
                    description: data.title,
                    key: pasteeApiKey,
                    sections: [
                        {
                            name: data.description,
                            contents: data.code
                        }
                    ]
                }
            }

            let res = await axios(pastee)

            return res.data.id
        } catch (err) {
            next(err)
        }
    }

    static async deletePasteeId(id){
        try {
            let res = await axios.delete(`https://api.paste.ee/v1/pastes/${id}`)

            return res
        } catch (err) {
            return err
        }
    }
}

module.exports = TodoController