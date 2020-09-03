const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication (req, res, next) {
    console.log(req.headers)
    

    const payload = verifyToken(req.headers.token)
    console.log(payload)
    User.findByPk(payload.id)
        .then( user => {
        if(user.email === payload.email)
            req.userData = payload
            next()
        })
        .catch (err => {
            return next(err)
        })
    
}
module.exports = authentication