const { Todo } = require('../models')

class Controller {

    static findAll(req, res) {
        Todo.findAll({ order: [['id', 'ASC']]})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static addTodo(req, res) {
        let newTodo = {
            tittle: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.create(newTodo)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if(err.errors) {
                const msg =[]
                for(let i = 0 ; i < err.errors.length; i++) {
                    msg.push(err.errors[i].message)
                }
                res.status(400).json({'Validation Error': msg.join(', ')})
            } 
            else {
                res.status(500).json(err)
            }
        })
    }

    static findById(req, res) {
        Todo.findByPk(req.params.id)
        .then(data => {
            if(!data) {
                res.status(404).json({message: 'Data Not Found'})
            } 
            else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateTodo(req, res) {
        let id = req.params.id
        let dataUpdate = {
            tittle: req.body.tittle,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.update(dataUpdate, {where: {id: id}})
        .then(data => {
            if(data === 1) {
                return Todo.findByPk(id)
            } 
            else {
                res.status(404).json({message:"Data Not Found"})
            }
        })
        .then(dataEdited => {
            res.status(200).json(dataEdited)
        })
        .catch(err => {
            if(err.errors) {
                const msg = []
                for(let i = 0 ; i < err.errors.length; i++) {
                    msg.push(err.errors[i].message)
                }
                res.status(400).json({'Validation Error': msg.join(', ')})
            } 
            else {
                res.status(500).json(err)
            }
        })
    }

    static deleteTodo(req, res) {
        let id = req.params.id
        let todoDeleted = []
        Todo.findByPk(id)
        .then(data => {
            if(data) {
                todoDeleted.push(data)
                return Todo.destroy({where: {id: id}})
            } 
            else {
                res.status(404).json({message: 'Error Not Found'})
            }
        })
        .then(data => {
            res.status(200).json(todoDeleted)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

}

module.exports = Controller