const {verify_token} = require(`./jwt`)
const {Todo} = require(`../models`)

module.exports = {
    authentication: (req, res, next) => {
        try{
            const userData = verify_token(req.headers.access_token)
            req.userData = userData
            next()
        }catch(err){
            return res.status(401),json({
                message: "User not authenticate"
            })
        }
    },

    authorization: async (req, res, next) => {
        const id = req.params.id

        try{
            const todo = await Todo.findByPk(id)

            if(todo && todo.UserId === req.userData.UserId){
                next()
            } else {
                return res.status(403).json({
                    message: "Forbidden Access"
                })
            }
        }catch(err){
            return res.status(403).json({
                message: "Forbidden Access"
            })
        }
    }

}