const { verifyToken } = require('../helpers/jwt')
// const { TodoController } = require('../controllers/todoController')
const { Todo, User } = require('../models')

const authentication = async (req, res, next) => {
    const { access_token } = req.headers
    try {
        const userData = verifyToken(access_token)
        console.log(userData)
        let user = await User.findOne({where: {email: userData.email}})
        if (user) {
            req.userData = userData
            next();
        } else {
            throw { message: 'User not authenticated', statusCode: 401 }
        }
    }
    catch(err) {
        return next(err)
    }
}

const authorization = async (req, res, next) => {
    const {id}= req.params
    try {
        const todo = await Todo.findByPk(id)
        if (todo && todo.UserId == req.userData.id) {
            next()
        } else {
            return res.status(403).json({message: 'User tidak memiliki akses'})
        }
    } catch (err) {
        return res.status(403).json({message: 'Forbidden Access'})
    }
}

module.exports = {authentication, authorization}