const { Todo } = require('../models')

class FancyTodoController {
    static show(req, res) {
        Todo.findAll()
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(500).json(err)
        })
    }
    static add(req, res) {
        let params = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        Todo.create(params)
        .then(data => {
            return res.status(201).json(data)
        })
        .catch(err => {
            return res.status(400).json({message: `Invalid requests`})
        })
    }
    static find(req, res) {
        Todo.findByPk(req.params.id)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(404).json(err)
        })
    }
    static edit(req, res) {
        let params = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(params, {where: {id: req.params.id}, returning: true})
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(400).json(err)
        })

    }
    static delete(req, res){
        let options = {
            where: {
                id: req.params.id
            },
            returning: true
        }
        Todo.destroy(options)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return res.status(404).json(err)
        })

    }

}

module.exports = FancyTodoController
