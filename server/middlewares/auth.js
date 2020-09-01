const { verifyToken } = require("../helpers/jwt")
const {User, Todo} = require("../models")

const authentication = (req,res,next) =>{
    try{
        const userData = verifyToken(req.headers.access_token)

        User.findOne({where:{username: userData.username}})
        .then(user=>{
            if(user){
                req.userData = userData
                next()
            }else{
                throw {message: "User not authenticated", statusCode: 400}
            }
        })
        .catch(err=>{
            err.message = "User not authenticated"
            next(err)
        })
    } catch(err){
        err.message = "User not authenticated"
        next(err)

    }
}

const authorization = (req,res,next) =>{
    const {id} = req.params
    Todo.findByPk(id)
    .then(todo=>{
        if(todo.UserId === req.userData.id){
            next()
        }else{
            throw {message: 'User not authorize', statusCode: 400}
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {authentication, authorization}