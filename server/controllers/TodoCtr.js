const {Todo, User} = require(`../models`)
const {verify_token} = require(`../helpers`)

class Controller{
    static create(req, res, next){
        let UserId = req.userData.UserId
        let data = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId
        }
        Todo.create(data)
            .then(data => {
                return res.status(201).json({
                    message: "Successfully create new Todo",
                    data
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static getAll(req, res, next){
        const {UserId} = req.userData
        Todo.findAll({
            include: [User], 
            where: {
                    UserId
                },
            order: [
                    ['createdAt', 'DESC']
                ],
            })
            .then(data => {
                if(data.length < 1){
                    return res.status(204).json({
                        message: "Empty Todo List"
                    })
                } else {
                    return res.status(201).json({
                        message: "Successfully get all Todo List",
                        data
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static getOne(req, res, next){
        let id = req.params.id
        Todo.findOne({
            include: [User], 
            where: {
                    id
                },
            })
            .then(data => {
                if(data < 1){
                    return res.status(204).json({
                        message: "Empty Todo List"
                    })
                } else {
                    return res.status(201).json({
                        message: "Successfully get One Todo List",
                        data
                    })
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static update(req, res, next){
        const id = req.params.id
        const {title, description, due_date} = req.body
            Todo.update({title, description, due_date}, {where: {id}})
            .then(data => {
                return res.status(201).json({
                    message: "Successfully update todo",
                    data: {
                        title, 
                        description, 
                        due_date
                    }
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static delete (req, res, next){
        const id = req.params.id
        Todo.destroy({where: {id}})
            .then(data => {
                return res.status(200).json({
                    message: "Successfully delete Todo"
                })
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = Controller