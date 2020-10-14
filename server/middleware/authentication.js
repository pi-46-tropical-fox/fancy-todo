const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication (req, res, next) {
    console.log(req.headers)
    

    const payload = verifyToken(req.headers.access_token)
    // console.log(payload)
    User.findByPk(payload.id)
        .then( user => {
            if(!user){
                throw {message: "Invalid email or password", statusCode: 401}
            }

            if(user.email === payload.email){
                req.userData = payload
                next()
            } else {
                throw {message: "Invalid email or password", statusCode: 401}
            }
        })
        .catch (err => {
            return next(err)
        })
    
}
module.exports = authentication