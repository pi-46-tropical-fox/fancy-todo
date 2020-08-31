const {User} = require ("../models")
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')

class UserController {

    static registerUser (req, res) {
        let params = {
            username : req.body.username,
            email : req.body.email,
            password : req.body.password,
        }

        User.create (params)

        .then (data => {
            return res.status (201).json (data)
        })

        .catch (err => {
            console.log (err, "--error register")
            return res.status (500).json ({message : err.message})
        })

    }

    static loginUser (req, res) {
        let {email, password} = req.body

        User.findOne ({
            where : {email}
        })

        .then (data => {
            const compare = bcrypt.compareSync (password, data.password)

            if (compare) {
                let secret = "secretpassword"
                let token = jwt.sign({ email: data.email, id: data.id }, secret);

                return res.status (200).json ({token})
            }

        })

        .catch (err => {
            console.log (err)
            return res.status (500).json ({message : err.message})
        })


    }

}

module.exports = UserController