const { Todo } = require('../models')

class TodoController {

    static show(req, res) {
        Todo.findAll()
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return res.status(500).json({ message: err.message })
            })
    }

}

module.exports = TodoController