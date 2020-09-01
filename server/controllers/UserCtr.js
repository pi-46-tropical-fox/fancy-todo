const {User} = require(`../models`)
const {access_token, bcrypt} = require(`../helpers`)

class Controller{
    static register(req, res){
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
                return res.status(400).json({
                    message: `Failed register new User`
                })
            })
    }

    static login(req, res){
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
                        return res.status(400).json({
                            message: "Invalid email or password"
                        })
                    }
                }else{
                    return res.status(400).json({
                        message: "Invalid email or password"
                    })
                }
            })
            .catch(err => {
                console.log(err, "<<<<<<< error login")
                return res.status(500).json({
                    message: "Internal error server"
                })
            })
    }
}

module.exports = Controller