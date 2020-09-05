const { Todo, User } = require('../models')

class FancyTodoController {
    static show(req, res, next) {
        // console.log(req.userData, '<<< userdata');
        Todo.findAll({
            where:{
                UserId: req.userData.id 
            }
        })
        .then(data => {
            // console.log(data, '<<< show');
            return res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })
    }
    static add(req, res, next) {
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
            return next(err)
        })
    }
    static find(req, res, next) {
        Todo.findByPk(req.params.id)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })
    }
    static edit(req, res, next) {
        let params = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(params, {where: {id: req.userData.id}, returning: true})
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })

    }
    static delete(req, res, next){
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
            return next(err)
        })

    }

}

module.exports = FancyTodoController
