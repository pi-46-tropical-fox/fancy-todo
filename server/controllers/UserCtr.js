const {User} = require(`../models`)
const {access_token, bcrypt} = require(`../helpers`)

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
                console.log(err)
                return next(err)
            })
    }

    static login(req, res, next){
        const {username, password} = req.body
        User.findOne({where: {username}})
            .then(data => {
                if(data){
                    const isValid = bcrypt(password, data.password)
                    if(isValid){
                        const token = access_token(username, data.id)
                        return res.status(200).json({
                            message: "Login Success",
                            token
                        })
                    } else {
                        throw { message: "Invalid email or password", statusCode: 400 }
                    }
                }else{
                    throw { message: "Invalid email or password", statusCode: 400 }
                }
            })
            .catch(err => {
                console.log(err)
                return next(err)
            })
    }
}

module.exports = Controller