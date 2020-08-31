const { User } = require('../models')

class userController {

    static register(req, res) {
        const { username, password, email } = req.body

        User.create({ username, email, password })
        .then(user => {
            const { username, email } = user
            res.status(201).json(user)
        })
        .catch( err => {
            console.log(err, ' <=== error register')
            res.status(500).json({message:"internal error server"})
        })
    }

    static login(req, res) {
        
    }
}

module.exports = userController