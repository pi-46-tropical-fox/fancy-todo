const {verify} = require('../helper/jwt')
const {User, Todo} = require('../models')

const authentication = (req,res,next) =>{
    const {access_token} = req.headers
        const user = verify(access_token)
        req.user = user
        console.log(user,"ini nihh")
        User.findOne({where:{email:user.email}})
        .then(data=>{
            if (data){
                next()
            }else{
                throw ({message:`user not authenticate`,status:401})
            }
        })
        .catch(err=>{
            next(err)
        })
}

const authorization = (req,res,next)=>{
    const id = req.params.id
    Todo.findOne({where:{id}})
    .then(data=>{
        if (data){
            if(data.UserId === req.user.id){
                next()
            }else{
                throw ({message:`forbiden access`,status:403})
            }
        }else{
            throw ({message:`forbiden access`,status:403})    
        }
    })
    .catch(err=>{
        next(err)
    })
    
}


module.exports = {authentication , authorization}