const { Todo, User } = require("../models")

class TodoController {
    static show(req,res,next){
        let todo
        Todo.findAll({
            // include:[User],
            order: [['id', 'ASC']]
        })
        .then(todos=>{
            todo = todos
            // res.status(200).json(todos)
            return User.findAll()
        })
        .then(user=>{
            // console.log(todo)
            let test = []
            user.forEach(el=>{
                test.push(el.fullname)
                todo.forEach(ele=>{
                    if(el.id === ele.UserId){
                        console.log(ele.dataValues)
                        // console.log('masuk', el.fullname)
                        ele.dataValues['userFullName'] = el.fullname
                        console.log('--')
                        console.log(ele.dataValues)
                    }
                })
            })
            // console.log(todo)
            res.status(200).json(todo)
        })
        .catch(err=>{
            // res.status(500).json({"message":"Server Error"})
            // err.message = "Server Error"
            // err.statusCode = 500
            next(err)
        })
    }

    static add(req,res,next){
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id,
            createdAt: new Date,
            updatedAt: new Date
        })
        .then(todo=>{
            res.status(201).json(todo)
        })
        .catch(err =>{
            next(err)
        })
    }

    static showById(req,res,next){
        Todo.findByPk(req.params.id)
        .then(todo=>{
            if(todo === null){
                // res.status(404).json({"msg": "Todo Not Fund"})
                throw {message: 'Todo Not Found', statusCode: 404}
            }else{
                res.status(200).json(todo)
            }
        })
        .catch(err=>{
            // res.status(500).json({"msg": "server error"})
            // console.log(err)
            next(err)
        })
    }

    static update(req,res,next){
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        },{
            where:{
                id: req.params.id
            },
            returning: true
        })
        .then(result =>{
            if(result[0] === 0){
                // res.status(404).json({"msg": "Todo Not Found"})
                throw {message: 'Todo Not Found', statusCode: 404}
            }
            res.status(200).json(result[1][0])
        })
        .catch(err=>{
            // res.status(500).json(err)
            next(err)
        })
    }

    static delete(req,res,next){
        Todo.destroy({
            where:{
                id:req.params.id
            },
            returning: true
        })
        .then(data=>{
            console.log(data)
            if(data === 0){
                // res.status(404).json({"msg": "Todo Not Found"})
                throw {message: 'Todo Not Found', statusCode: 404}
            }
            res.status(200).json({"msg" : `Success Delete Todo With Id: ${req.params.id}`})
        })
        .catch(err=>{
            // res.status(500).json({"msg": "Server Error"})
            next(err)
        })
    }
}

module.exports = TodoController