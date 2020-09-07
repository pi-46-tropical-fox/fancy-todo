const {verify_token} = require(`../helpers/jwt`)
const {Todo, User} = require(`../models`)

module.exports = {
    authentication: async (req, res, next) => {
        try{
            const userData = verify_token(req.headers.access_token)
            let user = await User.findOne({where: {username: userData.username}})
            if(user){
                req.userData = userData
                next()
            } else {
                throw { message: "User not authenticate", statusCode: 401}
            }
        }catch(err){
            return next(err)
        }
    },

    authorization: async (req, res, next) => {
        const id = req.params.id

        try{
            const todo = await Todo.findByPk(id)

            if(!todo){
                throw { message: "Todo not found", statusCode: 404 }
            }

            if(todo.UserId !== req.userData.UserId){
                throw { message: "Forbidden Access", statusCode: 403}
            }
            
            return next()
        }catch(err){
            return next(err)
        }
    }

}


