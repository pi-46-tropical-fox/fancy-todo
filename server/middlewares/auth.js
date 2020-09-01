const {verifyToken} = require('../helpers/jwt')
const {User, Task} = require('../models')

const authentication = async (req, res, next) => {
    const {access_token} = req.headers
    
    try{
        req.userData = verifyToken(access_token)
        let user = User.findOne({
            where:{
                username: req.userData.username
            }
        })

        if (user) {
            console.log('authentication accepted.');
            next()
        } else {
            throw {message: 'User not authenticated'}
        }
    } catch(err) {
        return res.status(401).json({message:'User not authenticated'})
    }
}

const authorization = async (req, res, next) => {
    const id = req.params.id

    try {
        const task = await Task.findByPk(id)

        if (task.UserId == req.userData.id) {
            console.log('authorization accepted.');
            next()
        } else {
            return res.status(403).json({message: 'forbidden access'})
        }
    } catch (err) {
        return res.status(403).json({message: 'forbidden access'})
    }
}

module.exports = {
    authentication,
    authorization
}