const { verifyToken } = require('../helpers/jwt')

function authentication (req, res, next) {
    console.log(req.headers)
    // if(!req.headers.token) {
        
    //     return res.status(401).json({message: "authentication failed"})
    // } else {
        try {
            const payload = verifyToken(req.headers.token)
            req.userData = payload
            next()
        } catch (err) {
            return res.status(401).json({message: "authentication failed"})
        }
    // }
}

module.exports = authentication