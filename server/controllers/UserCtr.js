const {User} = require(`../models`)
const {access_token, compare} = require(`../helpers`)
const {OAuth2Client} = require('google-auth-library');
  
class Controller{
    static register(req, res, next){
        let data = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        User.create(data)
            .then(result => {
                return res.status(200).json({
                    message: "Successfully register new User",
                    data: {
                        username: result.username,
                        email: result.email,
                        updatedAt: result.updatedAt,
                        createdAt: result.createdAt
                    }
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static login(req, res, next){
        const {username, password} = req.body
        User.findOne({where: {username}})
            .then(data => {
                const errorMessage = { message: "Invalid email or password", statusCode: 400 }
                if(!data){
                    throw errorMessage
                }
                
                const isValid = compare(password, data.password)
                if(isValid){
                    const token = access_token(username, data.id)
                    return res.status(200).json({
                        message: "Login Success",
                        token
                    })
                } else {
                    throw errorMessage
                }
            })
            .catch(err => {
                console.log(`Masuk pak Eko dari CATCH`)
                return next(err)
            })
    }

    static logingoogle(req, res, next){
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
            const { google_access_token } = req.headers
            let email_google, username
            client.verifyIdToken({
                idToken: google_access_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            .then(ticket => {
                return ticket.getPayload()
            })
            .then(payload => {
                email_google = payload.email
                username = payload.name
                return User.findOne({where:{email:payload.email}})
            })
            .then(user => {
                if (!user) {
                    return User.create({
                        email: email_google,
                        username,
                        password: 'password'
                    })
                } else {
                    return user
                }
            })
            .then(user => {
                const token = access_token(user.username, user.id)
                return res.status(200).json({access_token: token})
            })
            .catch(err => {
                next(err)
                console.log(err);
            })
        }
}

module.exports = Controller