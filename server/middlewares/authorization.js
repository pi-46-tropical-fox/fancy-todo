const { Todo } = require('../models')

const authorization = (req, res, next) => {
    const {id} = req.params

    Todo.findByPk(id)
    .then(todo => {
        if(!todo) {
            res.status(404).json({message: 'Todo Not Found'})
        } 
        else if(todo.UserId !== req.userData.id) {
            res.status(403).json({message: 'Forbidden Access'})
        } 
        else {
            next()
        }
    })
    .catch(err => {
        res.status(500).json({message: 'user not authorized'})
    })
}

module.exports = authorization