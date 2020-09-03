const {Task, User} = require('../models')
const { getCoordinates } = require('../middlewares/geocode')


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
                description: req.body.description,
                status: false,
                completedAt: null,
                location: req.body.location,
                UserId: req.userData.id
            }

            let location = await getCoordinates(task.location)
            
            if (location.statusCode) {
                throw location
            }

            task.longitude = location.features[0].center[0]
            task.latitude = location.features[0].center[1]
            task.location = location.features[0].place_name

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
                due_date: req.body.due_date,
                location: req.body.location
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