const { verifyToken } = require('../helpers/jwt')

const authentication = (req, res, next) => {
    const {access_token} = req.headers

    if(!access_token) {
        res.status(400).json({message: 'Please Login First'})
    }

    try{
        const decoded = verifyToken(access_token)
        req.userData = decoded
        next()
    } 
    catch(err) {
        res.status(401).json({message: 'user not authenticate'})
    }
}

module.exports = authentication 