const {verifyToken} = require('../helpers/jwt')
const {User, Task} = require('../models')

const authentication = async (req, res, next) => {
    try{
        console.log('Autheticatiing...');
        const {access_token} = req.headers
        let userData = verifyToken(access_token)
        let user = await User.findOne({
            where:{
                username: userData.username
            }
        })

        if (user) {
            req.userData = userData
            console.log('authentication accepted.');
            next()
        } else {
            throw {message: 'User not authenticated', statusCode: 401}
        }
    } catch(err) {
        return next(err)
    }
}

const authorization = async (req, res, next) => {
    try {
        console.log('Authorizing...');
        const task = await Task.findByPk(req.params.id)

        if (!task) {
            throw {message: 'Not found', statusCode: 404}
        }

        if (task.UserId == req.userData.id) {
            console.log('authorization accepted.');
            next()
        } else {
            throw {message: 'Forbidden Access', statusCode: 403}
        }
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    authentication,
    authorization
}