const {Todo,User} = require('../models')

class TodoController {

    static async getTodos(req,res,next) {
        try {
           const todos = await Todo.findAll({
            include: [User]
        })
           return res.status(200).json(todos)
        } catch(err) {
            return next(err)
        }
    }

    static async getMyTodos(req,res,next) {
        try {
           const user = await User.findOne({
               where: {username: req.query.q},
               include: [Todo]
           })


           return res.status(200).json(user.Todos)
        } catch(err) {
            return next(err)
        }
    }

    static async joinOtherUser(req,res,next) {
        try {
           const todo = await Todo.findOne({
               where: {id: req.params.id},
               include: [User]
           })
           console.log(todo);

        //    return res.status(200).json(user.Todos)
        } catch(err) {
            return next(err)
        }
    }

    

    static createTodo (req,res,next) {
        const todo = { 
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
         }
        Todo.create(todo)
            .then(todo => {
                return res.status(201).json(todo)
            })
            .catch(err => {
                return next(err)
            })

    }

    static getTodo (req,res,next) {
        Todo.findByPk(req.params.id)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            return next(err)
        })

    }

    static async updateTodo (req, res,next) {
        const updatedTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }
        try {
            const result = await Todo.update(updatedTodo, {
                where: {id: req.params.id}
            })
            if(!result) throw {statusCode: 404, msg: "book not found"}
            else return res.status(200).json(result)

        } catch(err){
            return next(err)
        }
    }

    static async deleteTodo (req, res, next) {
        try {
            const result =  await Todo.destroy({
                where: {id: req.params.id}
            })
            if(!result) throw {statusCode: 404, msg: "book not found"}
            else return res.status(200).json([result])
        }
        catch(err) {
            return next(err)
        }
    }

}


module.exports = TodoController