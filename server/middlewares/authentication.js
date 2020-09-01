const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
    const {access_token} = req.headers

    if(!access_token) {
        throw {name: 'USER_NOT_FOUND', statusCode: 400}
    }

    try{
        const decoded = verifyToken(access_token)
        let user = await User.findOne({
            where: {
                email: decoded.email
            }
        })
        
        if (user) {
            req.decoded = decoded
            next()
        } 
        else {
            throw { name: 'USER_NOT_AUTHENTICATED', statusCode: 401 }
        }
    } 
    catch(err) {
        next(err)
    }
}

module.exports = authentication 