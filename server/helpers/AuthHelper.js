const jwt = require('jsonwebtoken')
const errors = require('./ErrorHelper')
const secret = process.env.SECRET

const generateToken = (data) => {
    return jwt.sign(data, secret)
}

const verifyToken = (data) => {
    return jwt.verify(data, secret)
}

const authenticate = (req, res, next) => {
    const { access_token } = req.headers

    
    try {
        req.userData = verifyToken(access_token)

        next()
    } catch (e) {
        console.log(e);
        return errors.throwUnauthenticated(res, `You either are not logged in or don't have proper access token.`)
    }
}

// const authorize = (req, res, next) => {
//     const { access_token } = req.headers
    
//     try {
//         // 
//     } catch (e) {
//         return errors.throwUnauthorized(res, `You're not allowed to access this area`)
//         res.status(403).json({ msg: '403 Unauthenticated'})
//     }
// }

module.exports = {
    // any levels
    generateToken,
    verifyToken,

    // middleware-level
    authenticate,
    // authorize,
}