const { validateToken } = require('../Helpers/jwt')
const { User, Todo } = require('../models')

const authentication = async (req, res, next) => {
    const { access_token } = req.headers

    try {
        const userData = await validateToken(access_token)

        User.findOne({
            where: {
                email: userData.email
            }
        })
            .then(user => {
                if(user) {                    
                    req.userData = userData
                    next()
                }else {
                    throw {message: 'User not authenticated', statusCode: 401}
                }
            })

    } catch (err) {
        return next(err)
    }
}

const authorization = async (req, res, next) => {
    const { id } = req.params

    try {
        const todo = await Todo.findByPk(id)

        if(todo && todo.UserId === req.userData.id) {
            next()
        }else {
            res.status(401).json({message: 'user not authorized'})
        }
    } catch (err) {
        console.log(err)
        return res.status(401).json({message: 'user not authorized'})
    }    
}

const authorizationTitle = async (req, res, next) => {
    const { title } = req.params

    try {
        const todo = await Todo.findOne({
            where: {
                title: title
            }
        })

        if(todo && todo.UserId === req.userData.id) {
            next()
        }else {
            res.status(401).json({message: 'user not authorized'})
        }
    } catch (err) {
        console.log(err)
        return res.status(401).json({message: 'user not authorized'})
    }    
}

    const createProjectAuthr = (req, res, next) => {
        try {
            if(req.userData.role === "Project Manager") {
                next()
            }else {
                res.status(403).json({message: 'user not authorized'})
            }
        } catch (err) {
            console.log(err)
            return res.status(403).json({message: 'user not authorized'})
        }
    }




module.exports = { authentication, authorization, authorizationTitle, createProjectAuthr }