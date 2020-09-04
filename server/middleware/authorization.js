const {Todo} = require('../models')

const Authorization = (req,res,next) => {
    // cek kalau userid yg ada di todo yg ingin di update/delete/getid == userid yg login
    let idTodo = req.params.id
    console.log(idTodo,'in authorization');
    Todo.findOne({where:{id: idTodo}})
    .then(result => {
        if (!result) res.status(404).json({message: 'data not found'})
        else if (req.userData.id == result.UserId) {
            next()
        } else {
            res.status(401).json({message: 'user not authorized'})
        }
    })
    .catch(err => {
        res.status(400).json({message: 'invalid request'})
    })
}

module.exports = Authorization