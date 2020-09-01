const {Task} = require('../models')

class TaskController {
    static activeTasks (req, res) {
        Task.findAll({
            include: [User]
        })
            .then(tasks => {
                return res.status(200).json(tasks)
            })
            .catch(err => {
                return res.status(500).json({message: err.message})
            })
    }

    static newTask (req, res) {
        let task = {
            title: req.body.title,
            due_date: req.body.due_date,
            status: false,
            description: req.body.description,
            completedAt: null,
            UserId: req.userData.id
        }
        Task.create(task)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return res.status(500).json({message: err.message})
            })
    }

    static viewTask (req, res) {
        Task.findOne({
            where: {
                id: req.params.id
            }
        }).then(task => {
            return res.status(200).json(task)
        }).catch(err => {
            return res.status(500).json({message: err.message})
        })
    }

    static editTask (req, res) {
        const TaskId = req.params.id

        const data = {
            title: req.body.title,
            description: req.body.description,
            status: false,
            due_date: req.body.due_date
        }

        Task.update(data, {
            where: {
                id: TaskId
            },
            returning: true
        })
        .then(updated => {
            return res.status(200).json(updated[1])
        }).catch(err => {
            return res.status(500).json({message: err.message})
        })
    }

    static deleteTask (req, res) {
        const taskId = req.params.id
        Task.findOne({
            where: {
                id: taskId
            }
        }).then(task => {
            Task.destroy({
                where: {
                    id: taskId
                }
            }).then(destroyed => {
                return res.status(200).json(task)
            }).catch(err => {
                return res.status(500).json({message: err.message})
            })
        }).catch(err => {
            return res.status(500).json({message: err.message})
        })


    }
}

module.exports = TaskController