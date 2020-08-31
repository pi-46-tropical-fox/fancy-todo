const { Todo } = require("../models")

class TodoController {
    static show(req,res){
        Todo.findAll({
            order: [['id', 'ASC']]
        })
        .then(todos=>{
            res.status(200).json(todos)
        })
        .catch(err=>{
            res.status(500).json({"message": "cannot display todo's list"})
        })
    }

    static add(req,res){
        console.log(req.body)
        Todo.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            createdAt: new Date,
            updatedAt: new Date
        })
        .then(todo=>{
            res.status(201).json(todo)
        })
        .catch(err =>{
            res.status(500).json({"message": "error create new todo"})
        })
    }

    static showById(req,res){
        Todo.findByPk(req.params.id)
        .then(todo=>{
            if(todo === null){
                res.status(404).json({"msg": "Todo Not Fund"})
            }else{
                res.status(200).json(todo)
            }
        })
        .catch(err=>{
            res.status(500).json({"msg": "server error"})
            console.log(err)
        })
    }

    static update(req,res){
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
                res.status(404).json({"msg": "Todo Not Found"})
            }
            res.status(200).json(result[1][0])
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }

    static delete(req,res){
        Todo.destroy({
            where:{
                id:req.params.id
            },
            returning: true
        })
        .then(data=>{
            console.log(data)
            if(data === 0){
                res.status(404).json({"msg": "Todo Not Found"})
            }
            res.status(200).json({"msg" : `Success Delete Todo With Id: ${req.params.id}`})
        })
        .catch(err=>{
            res.status(500).json({"msg": "Server Error"})
        })
    }
}

module.exports = TodoController