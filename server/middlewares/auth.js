const { verifyToken } = require("../helpers/jwt")
const {User, Todo} = require("../models")

const authentication = (req,res,next) =>{
    try{
        const userData = verifyToken(req.headers.access_token)

        User.findOne({where:{username: userData.username}})
        .then(user=>{
            if(user){
                req.userData = userData
                next()
            }else{
                throw {message: "User not authenticated"}
            }
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    } catch(err){
        res.status(400).json(err)
    }
}

const authorization = (req,res,next) =>{
    const {id} = req.params
    // res.send(id)
    Todo.findByPk(id)
    .then(todo=>{
        console.log(req.userData.id, todo.UserId)
        if(todo.UserId === req.userData.id){
            res.status(200).json(todo)
        }else{
            res.status(400).json({message: "User not authenticated"})
        }
        
    })
    .catch(err=>{
        res.status(404).json({'msg': 'Todo Not Found'})
    })
}

module.exports = {authentication, authorization}