const { verifyToken } = require('../helpers/jwt')
const { Todo } = require('../models')

const authentication = (req,res,next) =>{
    const { acces_token } = req.headers
    try {
        const userData = verifyToken(acces_token)
        req.userData = userData
        console.log(userData,'ini data')
        next()
    } catch (err) {
        console.log(err,'ini error')
        res.status(401).json({msg : 'User Not Authenticated'})
    }
}

const authorization = (req,res,next) =>{
    Todo.findOne({where:{id: req.params.id}})
    .then(data =>{
        if(data && data.UserId === req.userData.id){
            next()
        }else{
            return res.status(401).json({msg:'Forbidden Access'})
        }
    })
    .catch(err =>{
        return res.status(400).json({msg:'Bad request'})
    })
}


module.exports = { authentication, authorization }