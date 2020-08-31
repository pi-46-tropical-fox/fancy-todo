const { User } = require('../models')
const runBcrypt = require('../Helpers/bcrypt')
const { generateToken } = require('../Helpers/jwt')

class UserController {
    static registerPost(req, res) {
        let userObj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(userObj)
            .then(data => {
                const { name, email } = data
                return res.status(200).json({ name, email })
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json(err)
            })

    }

    static loginPost(req, res) {
        User.findOne({
            where: {
                name: req.body.name
            }
        })
            .then(data => {
                if(!data) {
                    console.log('a')
                    return res.status(400).json({message: 'invalid name password'})
                }

                const flag = runBcrypt(req.body.password, data.password)

                if(flag) {
                    const token = generateToken(data)

                    return res.status(200).json({token})
                }else {
                    return res.status(400).json({message: 'invalid name or Password'})
                }
            })
            .catch(err => {
                return res.status(400).json(err)
            })
    }

}

module.exports = UserController