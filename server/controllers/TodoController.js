const {Todo,User} = require('../models')

class TodoController {

    static async getTodos(req,res,next) {
        try {
           const todos = await Todo.findAll()
           return res.status(200).json(todos)
        } catch(err) {
            return next(err)
        }
    }
    // "id": 2,
    // "username": "test_baru",
    // "email": "testbaru5123@mail.com",
    // "password": "$2b$10$zAsQdwqcdHrAwrq1k41lEu0ZpfDAZbXaPsXEOHUA/JvApowjZSKP6",
    // "createdAt": "2020-09-04T15:44:45.943Z",
    // "updatedAt": "2020-09-04T15:44:45.943Z",
    // "Todos": [
    //     {
    //         "id": 4,
    //         "title": "makan",
    //         "description": "nasi padang",
    //         "status": "sudah",
    //         "due_date": "2020-10-01T10:47:59.101Z",
    //         "UserId": 2,
    //         "createdAt": "2020-09-04T15:52:18.729Z",
    //         "updatedAt": "2020-09-04T15:52:18.729Z"
    //     },

    static async getMyTodos(req,res,next) {
        try {

           const user = await User.findOne({
               where: {username: req.query.q},
               include: [Todo]
           })

           return res.status(200).json(user)
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