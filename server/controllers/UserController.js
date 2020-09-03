const bcrypt = require ('bcrypt')
const {User} = require ("../models")
const {tokenGenerator} = require ("../helpers/jwt.js")
const {compare} = require ("../helpers/bcrypt.js")


class UserController {

    static registerUser (req, res, next) {
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
            // console.log (err)
            return next (err)
        })

    }

    static loginUser (req, res, next) {
        let {email, password} = req.body

        User.findOne ({
            where : {email}
        })

        .then (data => {
            if (!data) {
                // return res.status (400).json ({message : "Email or Password is wrong"})
                throw {message : "Email or Password is wrong", errorStatus : 400}
            }

            return data
        })

        

        .then (data => {
            const comparePassword = compare (password, data.password)

            if (comparePassword) {
                let payLoad = {id : data.id, email : data.email}

                let token = tokenGenerator (payLoad)

                return res.status (200).json ({token})
            
            } else {
                // console.log (password, data.password)
                throw {message : "Email or Password is wrong", errorStatus : 400}
            }

        })

        .catch (err => {
            // console.log (err)
            return next (err)
        })


    }

    
}

module.exports = UserController