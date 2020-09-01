const { verifyToken } = require('../helpers/jwt')
const { User, Todo } = require('../models')

const authentication = (req, res, next) => {
    const { access_token } = req.headers
    try {
        const userData = verifyToken(access_token)
        req.userData = userData
        next()
    } catch(err) {
       return res.status(401).json({message: 'Doesnt recognize User!'})
    }

}

const authorization = async (req, res, next) => {
    const { id } = req.params

    try {
        const todo = await Todo.findByPk(id)
        if (todo && todo.UserId === req.userData.id) {
            next()
        } else {
            return res.status(403).json({message: 'Forbidden Access'})
        }

    } catch(err) {
        return res.status(403).json({message: 'Forbidden Access'})

    }

}

module.exports = { authentication, authorization }