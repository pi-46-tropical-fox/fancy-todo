const { verifyToken } = require('../helpers/jwt')
const { Todo, User } = require('../models')

const authentication = async (req, res, next) => {
    const { access_token } = req.headers

    try {
        const userData = verifyToken(access_token)
        console.log(userData);
        let user = await User.findOne({
            where: {
                email: userData.email
            }
        })
        
        if (user) {
            req.userData = userData
            next()
        } else {
            throw {message: 'User not authenticated', statusCode: 401}
        }
    } 
    catch(err) {
        return next(err)
    }
}


const authorization = (req, res, next) => {
    const {id} = req.params

    Todo.findByPk(id)
    .then(todo => {
        if(!todo) {
            throw {message: 'Todo Not Found', statusCode: 404}
        } 
        else if(todo.UserId == req.userData.id) {
            next()
        } 
        else {
            throw {message: 'Forbidden access', statusCode: 403}
        }
    })
    .catch(err => {
        return next(err)
    })
}

module.exports = { authentication, authorization }  