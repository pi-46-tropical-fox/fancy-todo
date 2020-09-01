const {User} = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv')
require('dotenv').config()

const secret = process.env.SECRET

class UserController {
    static async register(req,res) {
        const params = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const registered = await User.create(params)
            res.status(201).json(registered)
        } catch (err) {
            next(err)
            // res.status(400).json(err)
        }
    }
    static async login(req,res) {
        // const { email,password } = req.body
        // console.log({email});
        try {
            const user = await User.findOne({where: {email: req.body.email }})
            // console.log(auth);
            if (user) {
                let auth = bcrypt.compareSync(req.body.password, user.password)
                if (auth) {
                    const accessToken = jwt.sign({email: user.email, id: user.id}, secret)
                    res.status(200).json(accessToken + '  << access token')
                } else throw res.status(400).json('wrong username/password')
            } else {
                throw res.status(400).json('wrong username/password')
            }
            
        } catch (err) {
            // res.status(400).json(err)
            next(err)
        }
    }
}

module.exports = UserController