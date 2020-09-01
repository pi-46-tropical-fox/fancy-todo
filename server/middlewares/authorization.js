const TodoController = require("../controllers/TodoController")
const {Todo} = require ("../models")

const authorization = (req, res, next) => {
    const {id} = req.params

    try {
        const data = Todo.findByPk (id)

        if (data && data.UserId === req.userData.id ) {
            next ()

        } else {
            return res.status (403).json ({message : "Unauthorized Access "})
        }

    } catch (err) {
        return res.status (403).json ({message : err.message})

    }
    
}

module.exports = {authorization}