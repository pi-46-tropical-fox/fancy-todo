const { Todo } = require('../models')

const authorization = (req, res, next) => {
    const {id} = req.params

    Todo.findByPk(id)
    .then(todo => {
        if(!todo) {
            throw {name: 'NOT_FOUND', statusCode: 404}
        } 
        else if(todo && todo.UserId !== req.userData.id) {
            throw ({name: `FORBIDDEN_ACCESS`, statusCode: 403})
        } 
        else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization