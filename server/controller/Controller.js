const { Todo } = require('../models')

class Controller {
    static async showAllTodo(req, res) {
        console.log(req.userData)
        try {
            const data = await Todo.findAll();
            res.status(200).json(data)
        } catch {
            res.status(400).json({ message: 'Invalid Request' })
        }
    }

    static addTodo(req, res) {
        let params = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.userData.id
        }
        Todo.create(params)
            .then(data => {
                if (data) {
                    res.status(201).json(data)
                } else {
                    res.status(500).json({ message: "Internal Server Error" })
                }
            })
            .catch(err => {
                return res.status(400).json(err.errors[0].message)
            })

    }

    static showTodo(req, res) {
        let id = req.params.id
        Todo.findByPk(id)
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    res.status(404).json({ message: "Error Not Found" })
                }
            })
            .catch(err => {
                res.status(500).json({ message: "Internal Server Error" })
            })
    }
    static async update(req, res) {
        let { id } = req.params
        let params = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        try {
            const newTodo = await Todo.update(params, { where: { id } });
            if (!newTodo[0]) {
                return res.status(404).json({ message: "Todo not found" })
            } else {
                res.status(200).json({ message: "Succesfully update Todo." })
            }

        } catch (err) {
            console.log(err, "<<< error di Todo.update")
            res.status(400).json({ message: "Internal Server Error" })
        }

        // .then(data => {
        //     if (data) {
        //         res.status(200).json(params)
        //     } else {
        //         res.status(500).json({ message: "Internal Server Error" })
        //     }
        // })
        // .catch(err => {
        //     res.status(400).json(err.errors[0].message)
        // })
    }

    static delete(req, res) {
        let id = req.params.id;
        let object;
        Todo.findByPk(id)
            .then(data => {
                object = data;
                return Todo.destroy({ where: { id } })
            })
            .then(data => {
                if (data) {
                    res.status(200).json(object)
                } else {
                    res.status(500).json({ message: "Internal Server Error" })
                }
            })
            .catch(err => {
                res.status(400).json(err.errors[0].message)
            })
    }
}

module.exports = Controller