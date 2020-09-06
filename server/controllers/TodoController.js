const {Todo} = require ("../models")

class TodoController {
    
    static postTodos (req, res, next) {
        let params = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            UserId : req.UserData.id
        }

        Todo.create (params)

        .then (data => {
            return res.status (201).json (data)
            
        })

        .catch (err => {
            // console.log (err, "--error create Todo")
            // return res.status (400).json ({message : err.message})
            // throw {message : "Bad Request - Error Validation", errorStatus : 400}
            return next (err)
            

        })

    }

    static getTodos (req, res, next) {
        Todo.findAll ()

        .then (data => {
            return res.status (200).json (data)

        })

        .catch (err => {
            // console.log (err, "--error show Todo")
            return next (err)

        })
    }

    static getTodosbyId (req, res, next) {
        Todo.findByPk (req.params.id)

        .then (data => {
            // console.log (data)
            return res.status (200).json (data)
        })

        .catch (err => {
            // console.log (err, "--error show Todo by Id")
            // return res.status (404).json ({message : err.message})
            // throw {message : "Data Not Found", errorStatus : 404}
            return next (err)

        })

    }

    static updateTodos (req, res, next) {
        let params = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date,
            
        }

        Todo.update (params, {
            where : {id : req.params.id}
        })

        .then (data => {
            // console.log (data)
            if (!data) {
                // return res.status (400).json ({message : "Bad Request"})
                throw {message : "Bad Request - Error Validation", errorStatus : 400}


            } else {
                return res.status (200).json ({message : "Successfully updating todo task"})
            }
        })

        .catch (err => {
            // console.log (err, "--error update Todo")
            // return res.status (404).json ({message : err.message})
            // throw {message : "Data Not Found", errorStatus : 404}
            return next (err)

        })

    }

    static deleteTodos (req, res, next) {
        Todo.destroy ({
            where : {id : req.params.id}
        })

        .then (data => {
            Todo.findAll ()
            return res.status (200).json ({message : "Deleted data from specific id"})

        })

        .catch (err => {
            // console.log (err, "--error delete Todo")
            return next (err)

        })

    }



}

module.exports =TodoController