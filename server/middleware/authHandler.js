const { verifyToken } = require('../helpers/AuthHelper')
const { User } = require('../models')

const authenticate = (req, res, next) => {
    const { access_token } = req.headers
    
    try {
        const userData = verifyToken(access_token)
        const user = User.findByPk(userData.id)
        if(user) {
            req.userData = userData

            next()
        } else {
            throw { code: 401, msg: `You either are not logged in or don't have proper access token.` }
        }
    } catch (err) {
        return next(err)
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
    authenticate,
    // authorize,
}