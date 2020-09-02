const { Todo } = require('../models');

class Controller {
    static async showAllTodo(req, res, next) {
        // console.log(req.userData)
        try {
            const data = await Todo.findAll({ where: { UserId: req.userData.id } });
            res.status(200).json(data)
        } catch {
            return next(arr)
                // res.status(400).json({ message: 'Invalid Request' })
        }
    }

    static addTodo(req, res, next) {
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
                    // res.status(500).json({ message: "Internal Server Error" })
                    throw { message: "Internal Server Error", statusCode: 500 }
                }
            })
            .catch(err => {
                // return res.status(400).json(err.errors[0].message)
                return next(err)
            })

    }

    static showTodo(req, res) {
        let id = req.params.id
        Todo.findByPk(id)
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    throw { message: "Error Not Found", statusCode: 404 };
                    // res.status(404).json({ message: "Error Not Found" })
                }
            })
            .catch(err => {
                return next(err);
                // res.status(500).json({ message: "Internal Server Error" })
            })
    }
    static async update(req, res, next) {
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
                throw { message: "Todo Not Found", statusCode: 404 };
            } else {
                res.status(200).json({ message: "Succesfully update Todo." })
            }

        } catch (err) {
            console.log(err, "<<< error di Todo.update")
            return next(err)
        }
    }

    static delete(req, res, next) {
        let { id } = req.params
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
                    // res.status(500).json({ message: "Internal Server Error" })
                    throw { message: "Internal Server Error", statusCode: 500 }
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}

module.exports = Controller