const {Todo} = require ("../models")

class TodoController {
    
    static postTodos (req, res) {
        let params = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }

        Todo.create (params)

        .then (data => {
            return res.status (201).json (data)
            
        })

        .catch (err => {
            return res.status (500).json ({message : err.message})

        })

    }

    static getTodos (req, res) {
        Todo.findAll ()

        .then (data => {
            return res.status (200).json (data)

        })

        .catch (err => {
            return res.status (400).json ({message : err.message})

        })
    }

    static getTodosbyId (req, res) {
        Todo.findByPk (req.params.id)

        .then (data => {
            return res.status (200).json (data)
        })

        .catch (err => {
            return res.status (404).json ({message : err.message})

        })

    }

    static updateTodos (req, res) {
        let params = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }

        Todo.update (params, {
            where : {id : req.params.id}
        })

        .then (data => {
            Todo.findByPk (req.params.id)
            return res.status (200).json (data)

        })

        .catch (err => {
            return res.status (404).json ({message : err.message})

        })

    }

    static deleteTodos (req, res) {
        Todo.destroy ({
            where : {id : req.params.id}
        })

        .then (data => {
            Todo.findAll ()
            return res.status (200).json (data)

        })

        .catch (err => {
            return res.status (400).json ({message : err.message})

        })

    }



}

module.exports =TodoController