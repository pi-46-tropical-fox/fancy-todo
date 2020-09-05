const { Todo, User } = require('../models')

class TodoController {
    static getTodos (req, res, next) {
        Todo.findAll({where : { UserId : req.userData.id, status : false}, order: [['due_date', 'ASC']], include: {model: User}})
            .then(todos => {
                return res.status(200).json(todos)
            })
            .catch(err => {
                return next(err)
            })
    }

    static createTodo (req, res, next) {
        
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
                return next(err)
            })
    }

    static find (req, res, next) {
        Todo.findByPk(req.params.id)
            .then( todo => {
                if(!todo){
                    throw { message: "Data not found", statusCode: 404}
                } else {
                    return res.status(200).json(todo)
                }
            })
            .catch( err => {
                return next(err)
            })
    }
    
    static putTodo (req, res, next) {
        const params = { 
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }

        Todo.update(params, {where: {id: req.params.id}})
            .then ( todo => {
                return res.status(200).json({message: `Successfully update Todo with id ${req.params.id}`})
            })
            .catch ( err => {
                return next(err)
            })
    }

    static deleteTodo (req, res, next) {
        Todo.destroy({where : { id : req.params.id}})
            .then( todo => {
                
                return res.status(200).json({message: `Successfully delete Todo with id ${req.params.id}`})
            })
            .catch( err => {
                return next(err)
            })
    }


}

module.exports = TodoController