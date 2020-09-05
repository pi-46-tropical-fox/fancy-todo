const {Task, User} = require('../models')
const { getCoordinates } = require('../helpers/geocode')
const { getWeather } = require('../helpers/weatherstack')


class TaskController {
    static async activeTasks (req, res, next) {
        try {
            const tasks = await Task.findAll({
                order: [['id', 'ASC']],
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
                },
                attributes: ['title', 'description', 'location', 'due_date', 'status', 'latitude', 'longitude']
            })
            const {title, description, location, due_date, status, latitude, longitude} = task.dataValues

            let weather
            weather = await getWeather(latitude, longitude)
            if (weather.error) {
                throw {message: weather.error.info, statusCode: weather.error.code}
            }
            if (task.due_date == new Date().toISOString().slice(10)) {
                weather = `Your due date is today. ${weather}`
            }

            return res.status(200).json({
                weatherMsg: weather,
                task: {
                    title, description, location, due_date, status
                }
            })
        } catch (err) {
            return next(err)
        }
    }

    static async toggleTask (req, res, next) {
        try {
            let task = await task.findOne({
                where: {
                    id: req.params.id
                },
                attributes: ['status']
            })
            task = task.dataValues

            await task.update({
                status: task.status ? false : true
            }, {
                where: {
                    id: req.params.id
                }
            })
        } catch (err) {

        }
    }

    static async editTask (req, res, next) {
        try {
            const data = {
                title: req.body.title,
                description: req.body.description,
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