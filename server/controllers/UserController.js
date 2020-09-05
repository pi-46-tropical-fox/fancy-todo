const { User } = require('../models')
const { compare } = require('../helpers/passwordHash')
const { generateToken } = require('../helpers/token')
const { OAuth2Client } = require('google-auth-library');

class Controller {
    static async register(req, res, next) {
        try {
            const { email, password } = req.body
            await User.create({ email, password })

            res.status(201).json(email)
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const found = await User.findOne({ where: { email } })

            if (found) {
                const pass = await compare(password, found.password)

                if (pass) {
                    generateToken({ email: found.email, id: found.id }, (err, data) => {
                        if (err) throw err
                        else res.status(200).json(data)
                    })
                } else {
                    throw { message : 'Email / Password Salah', statusCode : 401 }
                }
            } else {
                throw { message : 'Email / Password Salah', statusCode : 401 }
            }
        } catch (err) {
            next(err)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const { id_token } = req.headers

            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });

            const payload = ticket.getPayload();
            
            const userFind = await User.findOne({where : {email : payload.email}})

            if(userFind) {
                const cred = {
                    email : userFind.email,
                    id : userFind.id
                }

                generateToken(cred, (err, data) => {
                    if(err) {
                        throw err
                    } else {
                        res.status(200).json(data)
                    }
                })
            } else {
                const userCred = {
                    email : payload.email,
                    password : process.env.GOOGLE_PASS_CRED
                }

                const user = await User.create(userCred)
                
                // diulang supaya klo user google blm ada bisa langsung masuk tanpa reload
                generateToken({email : user.email, id : user.id}, (err, data) => {
                    if(err) {
                        throw err
                    } else {
                        res.status(200).json(data)
                    }
                })
            }
        } catch(err) {
            next(err)
        }
    }
}

module.exports = Controller