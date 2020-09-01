const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bycrpt')

class UserController {
    static register(req, res) {
        let params = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(params)
        .then(data => {
            const { email } = data
            res.status(201).json(email)
        })
        .catch(err => {
            res.status(500).json({message: `Internal Error Server`})
        })

    }
    static login(req, res) {
        let options = {
            where: {
                email: req.body.email
            }
        }
        User.findOne(options)
        .then(data => {
            if (data) {
                let isValid = comparePass(req.body.password, data.password)
                if (isValid) {
                    
                    const access_token = generateToken(data)
                   return res.status(200).json({ access_token })
                } else {
                    return res.status(400).json({message: `Invalid email/password!`})
                }
            } else {
                return res.status(400).json({message: `Invalid email/password!`})
            }
        })
        .catch(err => {
            console.log(err);
             return res.status(500).json({message: `Internal Error Server`})
        })

    }

}

module.exports = UserController