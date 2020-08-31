const { User } = require('../models')

class UserController {
    static registerPost(req, res) {
        let userObj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(userObj)
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json(err)
            })

    }

    static loginPost(req, res) {

    }

}

module.exports = UserController