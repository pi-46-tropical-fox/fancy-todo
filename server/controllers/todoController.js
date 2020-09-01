const { Todo } = require('../models')

 
class Controller{
    static show(req,res){
        console.log(req.userDataata)
        Todo.findAll()
        .then(data =>{
            console.log('succes')
            return res.status(200).json(data)
        })
        .catch(err =>{
            console.log('test')
            return res.status(400).json(err)
        })
    }

    static find(req,res){
        let id = req.params.id
        Todo.findOne({where:{id}})
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch(err =>{
            return res.status(400).json(err)
        })
    }

    static add(req,res){
        console.log(req.userData.id)
        let params = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            UserId : req.userData.id
        }
        Todo.create(params)
        .then(data =>{
            console.log('succes')
            console.log(data)
            return res.status(200).json(data)
        })
        .catch(err =>{
            console.log('test')
            return res.status(400).json(err)
        })
    }

    static edit(req,res){
        let params = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
        }
        let id = req.params.id
        Todo.update(params,{where:{id}})
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch(err =>{
            return res.status(400).json(err)
        })
    }

    static delete(req,res){
        let id = req.params.id
        Todo.destroy({where:{id}})
        .then(data =>{
            return res.status(200).json(data)
        })
        .catch(err =>{
            return res.status(400).json(err)
        })
    }
}


module.exports = Controller