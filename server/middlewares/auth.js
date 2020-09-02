const { verifyToken } = require('../helpers/jwt')
const { Todo } = require('../models')

const authentication = (req, res, next) => {
    const { access_token } = req.headers

    if(!access_token) {
        return res.status(400).json({message: 'Please Login First'})
    }

    try {
        const userData = verifyToken(access_token)
        req.userData = userData

        next()
    } 
    catch(err) {
        return res.status(401).json({message: 'User not authenticated'})
    }
}


const authorization = (req, res, next) => {
    const {id} = req.params

    Todo.findByPk(id)
    .then(todo => {
        if(!todo) {
            return res.status(404).json({message: 'Todo Not Found'})
        } 
        else if(todo.UserId == req.userData.id) {
            next()
        } 
        else {
            return res.status(403).json({message: 'Forbidden Access'})
        }
    })
    .catch(err => {
        return res.status(500).json({message: 'User not authorized'})
    })
}

module.exports = { authentication, authorization }  