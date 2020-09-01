const { User } = require('../models')
const runBcrypt = require('../Helpers/bcrypt')
const { generateToken } = require('../Helpers/jwt')

class UserController {
    static registerPost(req, res, next) {
        let userObj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(userObj)
            .then(data => {
                const { id, name, email } = data
                return res.status(200).json({ id, name, email })
            })
            .catch(err => {
                return next(err)
            })

    }

    static loginPost(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(data => {
                if(!data) {
                    // return res.status(400).json({message: 'invalid name password'})
                    throw {message: 'Invalid name or password', statusCode: 400}
                }

                const flag = runBcrypt(req.body.password, data.password)

                if(flag) {
                    const token = generateToken(data)
    
                    return res.status(200).json({token})
                }else {
                    throw {message: 'Invalid name or password', statusCode: 400}
                }
            })
            .catch(err => {
                return next(err)
            })
    }

}

module.exports = UserController