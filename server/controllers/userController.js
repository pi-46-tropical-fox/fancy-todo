const { User } = require('../models')
const { compareHashes } = require('../helpers/bcrypt')
const { generateToken, verifyToken }  = require('../helpers/jwt')



class Controller{
    static async register(req,res, next){
        let params = {
            email : req.body.email,
            username : req.body.username,
            password : req.body.password
        }
        try {
            let user = await User.create(params)
            let { id, email, username } = user
            return res.status(201).json({id, email, username})
        } catch (error) {
            // console.log(error)
            // return res.status(400).json({message:'bad request'})
            return next(error)
        }
    }

    static async login(req,res,next){
        let {email, password} = req.body
        try {
            let user = await User.findOne({where:{email}})
            if(!user){
                return res.status(401).json({message: "invalid email or password"})
            }else{
                console.log(user)
                if(compareHashes(password,user.password)){
                    const token = generateToken(email, user.id)
                    console.log(token, 'ini token')
                    return res.status(200).json({token})
                }else{
                    // return res.status(401).json({message:'invalid email or password'})
                    next(error)
                }
            }

        } catch (error) {
            // return res.status(500).json(error)
            return next(error)
        }
    }
}


module.exports = Controller