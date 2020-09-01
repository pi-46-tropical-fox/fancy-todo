const { Todo } = require('../models')

class TodoController {
    static getTodos (req, res) {
        Todo.findAll({where : { UserId : req.userData.id}})
            .then(todos => {
                return res.status(200).json(todos)
            })
            .catch(err => {
                return res.status(500).json({message : err.message})
            })
    }

    static createTodo (req, res) {
        
        const data = {
            title : req.body.title,
            description : req.body.description,
            due_date : req.body.due_date,
            UserId : req.userData.id
        }

        Todo.create(data)
            .then( todo => {
                return res.status(201).json(todo)
            })
            .catch( err => {
                return res.status(500).json({message : err.message})
            })
    }

    static find (req, res) {
        Todo.findByPk(req.params.id)
            .then( todo => {
                res.status(200).json(todo)
            })
            .catch( err => {
                res.status(404).json({message: `data not found`} )
            })
    }
    
    static putTodo (req, res) {
        const params = { 
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }

        Todo.update(params, {where: {id: req.body.id}})
            .then ( todo => {
                res.status(200).json({message: `Successfully update Todo with id ${req.params.id}`})
            })
            .catch ( err => {
                res.status(404).json({message:`data not found`})
            })
    }

    static deleteTodo (req, res) {
        Todo.destroy({where : { id : req.params.id}})
            .then( todo => {
                res.status(200).json({message: `Successfully delete Todo with id ${req.params.id}`})
            })
            .catch( err => {
                res.status(404).json({message: `data not found`} )
            })
    }


}

module.exports = TodoController