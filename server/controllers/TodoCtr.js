const {Todo, User} = require(`../models`)
const {verify_token} = require(`../helpers`)

class Controller{
    static create(req, res){
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
                console.log(err)
                return res.status(400).json({
                    message: "Error create new todo"
                })
            })
    }

    static getAll(req, res){
        const {UserId} = req.userData
        Todo.findAll({include: [User], where: {UserId}})
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
                console.log(err)
                return res.status(400).json({
                    message: "Failed to get all Todo List"
                })
            })
    }

    static update(req, res){
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
                console.log(err)
                return res.status(404).json({
                    message: "Todo not found"
                })
            })
    }

    static delete (req, res){
        const id = req.params.id
        Todo.destroy({where: {id}})
            .then(data => {
                return res.status(200).json({
                    message: "Successfully delete Todo"
                })
            })
            .catch(err => {
                console.log(err)
                return res.status(404).json({
                    message: "Todo not found"
                })
            })
    }
}

module.exports = Controller