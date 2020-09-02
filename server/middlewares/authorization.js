const TodoController = require("../controllers/TodoController")
const {Todo} = require ("../models")

const authorization = (req, res, next) => {
    const {id} = req.params

        Todo.findByPk (id)
        
        .then (data => {
            if (data && data.UserId === req.UserData.id ) {
                next ()
    
            } else {
                // console.log (data.UserId)
                // return res.status (403).json ({message : "Unauthorized Access "})
                throw {message : "Unauthorized Access", errorStatus : 403}
            }

        })

        .catch (err => {
            // console.log (err.name)
            return res.status (403).json ({message : err.message})
            // throw {message : "Unauthorized Access", errorStatus : 403}

        })

    
    
}

module.exports = {authorization}