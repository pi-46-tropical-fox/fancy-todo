const { User } = require ('../models')
const jwt = require('jsonwebtoken')
const bcryptsjs = require('bcryptjs')

class UserController {
    static register (req,res) {
        const { username, email, password } = req.body

        User.create({username, email, password})
            .then(user => {
                const { username, email } = user
                res.status(201).json({username, email})
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({message: "internal error server"})
            })
    }

    static login (req,res) {
        
    }
}

module.exports = UserController