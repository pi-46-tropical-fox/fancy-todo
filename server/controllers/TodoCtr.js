const {Todo, User} = require(`../models`)
const {verify_token} = require(`../helpers`)

class Controller{
    static create(req, res){
        let UserId = verify_token(req.header.token)
        let data = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: UserId
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
        Todo.findAll({where: {UserId: req.session.UserId}})
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
        Todo.update({where: {id}})
            .then(data => {
                return res.status(201).json({
                    message: "Successfully update todo",
                    data
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
                    message: "Successfully delete Todo",
                    data
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