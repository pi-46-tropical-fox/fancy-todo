const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bycrpt')

class UserController {

    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            const newUser = await User.create({email, password})

            return res.status(201).json({
                email: newUser.email,
            })
        } catch(err) {
            return next(err)
        }
    }
   
    static login(req, res, next) {
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
                    throw { message: 'Invalid username or password', statusCode: 400 }
                }
            } else {
               throw { message: 'Invalid username or password', statusCode: 400 }
            }
        })
        .catch(err => {
            console.log(err);
            return next(err)
        })

    }

}

module.exports = UserController