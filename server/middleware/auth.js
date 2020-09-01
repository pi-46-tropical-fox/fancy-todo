const {Todo, User} = require('../models')
const {verifyToken} = require('../helpers/jwt')

const authentication = async (req, res, next) => {    
    const {access_token} = req.headers
    try {
        const user = verifyToken(access_token)
        const data = await User.findOne({
            where: {
                email : user.email
            }
        })
        if(data){
            req.user = user
            next()
        }else{
            throw {message: `User not authenticated`}
        }

    } catch(err) {
        return res.status(401).json({message: `User not authenticated`})
    }
}

const authorization = async (req, res, next) => {
    try{
        const todo = await Todo.findOne({
            where: {
                id: +req.params.id
            }
        })
        if(todo && todo.UserId === req.user.id){
            next()
        }else{
            return res.status(403).json({message: 'Forbidden access'})
        }
    }catch(err){
        return res.status(403).json({message: 'Forbidden access'})
    }
}

module.exports = {authentication, authorization}