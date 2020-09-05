const bcrypt = require ('bcrypt')
const {OAuth2Client} = require('google-auth-library');
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

    static googleLogin (req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const {google_id_token} = req.headers
        let username_google = ''
        let email_google = ''

        client.verifyIdToken({
            idToken: google_id_token,
            audience: process.env.CLIENT_ID,    // Specify the CLIENT_ID of the app that accesses the backend
                                    // Or, if multiple clients access the backend:
                                    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })

        .then (ticket => {
            return ticket.getPayload()
        })

        .then (payLoad => {
            console.log (payLoad)
            username_google = payLoad.given_name
            email_google = payLoad.email
            return User.findOne ({where : {email : payLoad.email}})
        })

        .then (user => {
            if (!user) {
                let params = {
                    username : username_google,
                    email : email_google,
                    password : "admin"
                }
                return User.create (params)
            
            } else {
                return user
            }
        })

        .then (user => {
            const payLoad = {id : user.id, email : user.email}
            const google_token = tokenGenerator (payLoad)

            return res.status (200).json ({token : google_token}) 
        })

        .catch (err => {
            // console.log (err)
            return next(err)
        })

    }

    
}

module.exports = UserController