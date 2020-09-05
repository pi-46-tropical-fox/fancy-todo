const { User } = require('../models');
const { compare } = require('../helpers/bcrypt');
const { generateToken, verifyToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');
const { patch } = require('../routes');
//###############################################################
class Controller {
    static register(req, res, next) {
        const { username, email, password } = req.body;
        User.create({ username, email, password })
            .then(user => {
                const { username, email } = user
                res.status(201).json({ username, email })
            })
            .catch(err => {
                return next(err)
            })
    };

    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    const isValid = compare(password, user.password) //Compare Password(using bacrypt)//
                    if (isValid) {

                        const access_token = generateToken(user) //Generate Token (using JWT)//
                        return res.status(200).json({ access_token, user })
                    } else {
                        throw { message: "Username/password is invalid", statusCode: 400 }
                    }
                } else {
                    throw { message: "Username/password is invalid", statusCode: 400 }
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static googleLogin(req, res, next) {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const { google_access_token } = req.headers;
        let email;
        let googleData;
        client.verifyIdToken({
                idToken: google_access_token,
                audience: process.env.CLIENT_ID
            })
            .then(ticket => {
                return ticket.getPayload()
            })
            .then(payload => {
                googleData = payload;
                console.log(payload)
                email = payload.email
                return User.findOne({
                    where: { email }
                })
            })
            .then(user => {
                if (!user) {
                    let obj = {
                        email: email,
                        password: 'randompasswordforuser'
                    }
                    return User.create(obj)
                } else {
                    return user
                }
            })
            .then(user => {
                const access_token = generateToken(user)
                return res.status(200).json({ access_token, googleData })
            })
            .catch(err => {
                console.log(err);
                next(err)
            })
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
    }
}

module.exports = Controller