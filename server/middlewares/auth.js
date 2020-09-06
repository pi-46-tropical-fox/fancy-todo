const { verifyToken } = require('../helpers/token')
const { Todo, User } = require('../models')

const authentication = async (req, res, next) => {
    const { access_token } = req.headers

    try {
        const userData = await verifyToken(access_token)        
        const findUser = await User.findOne({
            where: {
                email : userData.email
            }
        })

        if(findUser) {
            req.userData = userData
            next()
        } else {
            throw { message : 'User Not Authenticated', statusCode : 401}
        }
    } catch(err) {
        next(err)
    }
} 

const authorization = async (req, res, next) => {
    try {
        const TodoFound = await Todo.findByPk(req.params.id)

        if(TodoFound === null) {
            throw { message : '404 Not Found', statusCode : 404 }
        } else {
            if(TodoFound.UserId == req.userData.id) {
                next()
            } else {
                throw { message : 'Forbidden Access', statusCode : 403 }
            }
        } 
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication, authorization }