const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

class UserController {

    static register(req, res) {
        let params = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(params)
        .then(data =>{
            res.status(201).json(data)
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({message: 'internal server error'})
        })
        
    }

    static login(req, res) {
        let option = {
            where: {
                email: req.body.email
            }
        }

        User.findOne(option)
        .then(data =>{
            if(data){
                let hasValid = comparePassword(req.body.password, data.password)
                if(hasValid){
                    const access_token = generateToken(data)
                    return res.status(200).json({access_token})
                }
                else{
                    return res.status(400).json({message: `invalid bad request`})
                }
            }
            else{
                return res.status(400).json({message: `invalid email or pass`})
            }
        })

        .catch(err =>{
            console.log(err)
            res.status(500).json({message: 'internal server error'})
        })
    }

}

module.exports = UserController 