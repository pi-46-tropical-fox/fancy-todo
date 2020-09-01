const {Todo} = require('../models')

class TodoController{

    static read(req, res){

        Todo.findAll({order:[['id']]})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err)
        })
    }

    static add(req, res){
        let query = {
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            due_date:req.body.due_date
        }

        Todo.create(query)
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err=>{
            console.log(err);
            res.status(400).json(err)
        })
    }


    static findById(req, res){
        Todo.findByPk(req.params.id)
        .then(data =>{
            if(!data){
                res.status(404).json({message:"Data Tidak Ditemukan"})
            }else{
                res.status(200).json(data)
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }

    static delete(req, res){
        let temp;

        Todo.findByPk(+req.params.id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(data => {
            res.status(404).json(err)
        })
    }

    static async updateTodo(req, res, next) {
        try {
            const updateTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                UserId: req.body.UserId
            }

            const result = await Todo.update(updateTodo, {
                where: {
                    id: +req.params.id
                }
            })
            if (!result) {
                next({ errorCode: 'NOT_FOUND' });
            } else {
                const todo = await Todo.findByPk(+req.params.id)
                res.status(200).json(todo)
            }
        } catch (err) {
            next(err);
        }
    }

}


module.exports = TodoController