const {Task, User} = require('../models')

class TaskController {
    static async activeTasks (req, res, next) {
        try {
            const tasks = Task.findAll({
                include: [{model: User, attributes: ['username']}]
            })
            
            return res.status(200).json(tasks)
        } catch (err) {
            return next(err)
        }
    }

    static async newTask (req, res, next) {
        try {
            let task = {
                title: req.body.title,
                due_date: req.body.due_date,
                status: false,
                description: req.body.description,
                completedAt: null,
                UserId: req.userData.id
            }

            let createdTask = await Task.create(task)

            return res.status(201).json(createdTask)
        } catch (err) {
            return next(err)
        }
    }

    static async viewTask (req, res, next) {
        try {
            let task = await Task.findOne({
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json(task)
        } catch (err) {
            return next(err)
        }
    }

    static async editTask (req, res, next) {
        try {
            const data = {
                title: req.body.title,
                description: req.body.description,
                status: false,
                due_date: req.body.due_date
            }
    
            let updated = await Task.update(data, {
                where: {
                    id: req.params.id
                },
                returning: true
            })

            return res.status(200).json(updated[1])
        } catch (err) {
            return next(err)
        }
    }

    static async deleteTask (req, res, next) {
        try {
            let task = await Task.findOne({
                where: {
                    id: req.params.id
                }
            })

            await Task.destroy({
                where: {
                    id: req.params.id
                }
            })

            return res.status(200).json(task)
        } catch (err) {
            return next
        }
    }
}

module.exports = TaskController