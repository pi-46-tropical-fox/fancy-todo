const { verifyToken } = require('../helpers/token')
const { Todo } = require('../models')

const authentication = async (req, res, next) => {
    const { access_token } = req.headers

    try {
        const userData = await verifyToken(access_token)

        req.userData = userData
        next()
    } catch(err) {
        res.status(401).json({msg : 'User Not Authenticated'})
    }
}

const authorization = async (req, res, next) => {
    try {
        const TodoFound = await Todo.findByPk(req.params.id)

        if(TodoFound.UserId == req.userData.id) {
            next()
        } else {
            res.status(403).json({msg : 'Forbidden Access'})    
        }
    } catch (err) {
        res.status(403).json({msg : 'Forbidden Access'})
    }
}

module.exports = { authentication, authorization }