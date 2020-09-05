const { Todo } = require('../models')

class Controller {

    static findAll(req, res, next) {
        const dataId = req.userData.id
        Todo.findAll(
            {   
                order: [['id', 'ASC']],
                where: { UserId: dataId }
            }
        )
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static addTodo(req, res, next) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }

        Todo.create(newTodo)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findById(req, res, next) {
        Todo.findByPk(req.params.id)
        .then(data => {
            if(!data) {
                next({name: 'ERROR_NOT_FOUND'})
            } 
            else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static updateTodo(req, res, next) {
        let id = req.params.id
        let dataUpdate = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        console.log(dataUpdate, '<<< data update')
        Todo.update(dataUpdate, {where: {id: id}})
        .then(data => {
            return Todo.findByPk(id)
        })
        .then(dataEdited => {
            res.status(200).json(dataEdited)
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTodo(req, res, next) {
        let id = req.params.id
        let todoDeleted = []
        Todo.findByPk(id)
        .then(data => {
            if(data) {
                todoDeleted.push(data)
                return Todo.destroy({where: {id: id}})
            } 
            else {
                next({name: 'ERROR_NOT_FOUND'})
            }
        })
        .then(data => {
            console.log(data)
            res.status(200).json(todoDeleted)
        })
        .catch(err => {
            next(err)
        })
    }
        //destroy -> return data 1 jika sukses delete, 0 jika gagal
}

module.exports = Controller 