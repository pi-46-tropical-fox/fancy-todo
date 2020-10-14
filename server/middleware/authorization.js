const { Todo } = require('../models')


const authorization = async ( req, res, next) => {
    const id = req.params.id

    try {
        const todo = await Todo.findByPk(id)
        console.log(todo)
        if ( todo && todo.UserId === req.userData.id) {
            next()
        } else {
            throw {message: "Forbidden Access", statusCode: 403}
        }

    } catch (err) {
        return next(err)
    }
}

module.exports = authorization