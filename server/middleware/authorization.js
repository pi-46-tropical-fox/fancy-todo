const { Todo } = require('../models')


const authorization = async ( req, res, next) => {
    const id = req.params.id

    try {
        const todo = await Todo.findByPk(id)
        console.log(todo)
        if ( todo && todo.UserId === req.userData.id) {
            next()
        } else {
            return res.status(403).json({message: "Forbidden Access"})
        }

    } catch (err) {
        return res.status(403).json({message: "Forbidden Access"})
    }
}

module.exports = authorization