const {verifyToken} = require('../helpers/jwt.js')
const {Todo,User} = require('../models')
const TodoController = require('../controllers/TodoController.js')

const authentication = async (req, res, next) => {
    const {access_token} = req.headers

    try {
        const userData = verifyToken(access_token)

        let user = await User.findOne({
            where: {
                email: userData.email
            }
        })

        if (user) {
            req.userData = userData
            next()
        } else {
            throw {msg: "User not authenticated", statusCode: 401}
        }

    } catch(err) {
        return next(err)
    }
}


const authorization = async (req, res, next) => {
    const {id} = req.params
    try {
        const todo = await Todo.findByPk(id) 
            if(todo && todo.UserId == req.userData.id) {
                next()
            } else {
                throw  {msg: "forbidden access", statusCode: 403}
            }

    } catch(err) {
        return next(err) 
    }
}

module.exports = {authentication,authorization}