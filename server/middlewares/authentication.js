const { tokenVerificator } = require ("../helpers/jwt.js")
// const UserController = require("../controllers/UserController.js")

const authentication = (req, res, next) => {
    const {token} = req.headers
    const {User} = require ("../models")

    
        const data = tokenVerificator (token)
        // console.log (data)
        User.findByPk(data.id)

        .then (result => {
            // console.log (result.id)
            req.UserData = result
            next ()

        }) 
         .catch (err => {
             console.log (err)
             return res.status (401).json ({message : "Invalid User"})
         })      
    
    

}

module.exports = {authentication}