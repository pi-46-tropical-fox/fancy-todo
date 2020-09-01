const {User} = require ("../models")
const {tokenGenerator} = require ("../helpers/jwt.js")

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
            if (!data) {
                return res.status (400).json ({message : "Email or Password is wrong"})
            }

            return data
        })

        

        .then (data => {
            const compare = bcrypt.compareSync (password, data.password)

            if (compare) {
                
                let token = tokenGenerator (data)

                return res.status (200).json ({token})
            
            } else {
                // console.log (password, data.password)
                return res.status (400).json ({message : "Email or Password is wrong"})
            }

        })

        .catch (err => {
            // console.log (err)
            return res.status (500).json ({message : err.message})
        })


    }

}

module.exports = UserController