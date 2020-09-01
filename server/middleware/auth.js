const {verifyToken} = require('../helpers/generateJWT');
const {Todo, User} = require('../models');

const authentication = async (req,res,next) => {
    // console.log(req.headers, "ini authentication...")
    
    const {acces_token} = req.headers

    try {
        const userData = verifyToken(acces_token)
        
        let user = await User.findOne({
            where: {
                email: userData.email
            }
        })

        if(user) {
            req.userData = userData
            next()
        } else {
            throw {message: "User not autenticated"}
        }

    } catch (err) {
        console.log(err, "ini error auth")
        res.status(401).json({message: "User not autenticated"})
    }
}

const authorization = async (req,res,next) => {
    const {id} = req.params

    try {
        const todo = await Todo.findByPk(id)

        if(todo && todo.UserId === req.userData.id) {
            next()
        } else {
            return res.status(403).json({message: "forbidden access"})
        }
    } catch (err) {
        return res.status(403).json({message: "forbidden access"})
    }
}

module.exports = {
    authentication, authorization
};
