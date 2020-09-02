const { verifyToken } = require('../helpers/jwt')
const { Todo, User } = require('../models')


const authentication  = async (req,res,next) =>{
    const { acces_token } = req.headers
    try {
        const userData = verifyToken(acces_token)
        let user = await User.findOne({where:{email:userData.email}})
        if(user){
            req.userData = userData
            console.log(userData,'ini data')
            next()
        }else{
            throw{msg : 'User Not Authenticated', statusCode:401}
        }
    } catch (err) {
        console.log(err,'ini error')
        // res.status(401).json({msg : 'User Not Authenticated'})
        return next(err)
    }
}

const authorization = (req,res,next) =>{
    Todo.findOne({where:{id: req.params.id}})
    .then(data =>{
        if(data && data.UserId === req.userData.id){
            next()
        }else{
            // return res.status(401).json({msg:'Forbidden Access'})
            throw{msg:'Forbidden Access', statusCode: 401}
        }
    })
    .catch(err =>{
        // return res.status(400).json({msg:'Bad request'})
        return next(err)
    })
}


module.exports = { authentication, authorization }