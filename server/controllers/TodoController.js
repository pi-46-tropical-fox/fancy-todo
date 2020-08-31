const {Todo} = require('../models')

class TodoController {
    static getTodos(req,res) {
        console.log('masuk');
        Todo.findAll()
            .then(todos => {
                return res.status(200).json(todos)
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({msg: err.msg})
            })

    }

    static createTodo (req,res) {
        const todo = { 
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date || new Date()
         }
        Todo.create(todo)
            .then(todo => {
                return res.status(201).json(todo)
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({msg: err.msg})
            })

    }

    static getTodo (req,res) {
        Todo.findByPk(req.params.id)
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(err => {
            console.log(err);
            return res.status(404).json(err)
        })

    }

    static updateTodo (req, res) {
        const updatedTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        Todo.update(updatedTodo, {
            where: {id: req.params.id}
        })
            .then(data => {
                console.log(data)
                if(!data) return res.status(404).json(data)
                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                return res.status(500).json(err)
            })
    }

    static deleteTodo (req, res) {
        Todo.destroy({
            where: {id: req.params.id}
        })
            .then(data => {
                if(!data) return res.status(404).json(data)
                else return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json(err)
            })
    }


    

}


module.exports = TodoController