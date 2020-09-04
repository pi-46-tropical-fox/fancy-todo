const { Project, User, Todo } = require('../models')

class ProjectController {
    static addProject(req, res, next) {
        let projectObj= {
            projectName: req.body.projectName,
            projectDescription: req.body.projectDescription
        }

        Project.create(projectObj)
            .then(data => {
                return res.status(201).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }

    static readAllProjects(req, res, next) {
        Project.findAll({
            include: [User, Todo]
        })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }

    static selectProject(req, res, next) {
        Project.findOne({
            where: {
                id: req.params.id
            },
            include: [User, Todo]
        })
            .then(data => {
                return res.status(200).json(data)
            })
            .catch(err => {
                return next(err)
            })
    }

    static updateProject(req, res, next) {
        let projectObj={
            projectName: req.body.projectName,
            projectDescription: req.body.projectDescription,
            updatedAt: new Date()
        }
        Project.update(projectObj, {
            where: {
                id: req.params.id
            }
        })
            .then(data => {
                if(!data) throw{message: 'Project not found', statusCOde: 404}
                return res.status(200).json({message: "Update Success!"})
            })
            .catch(err => {
                return next(err)
            })
    }

    static deleteProject(req, res, next) {
        Project.destroy({where: {id: req.params.id}})
            .then(data => {
                if(!data) {
                    throw{message: 'Project not found', statusCOde: 404}
                }else {
                    return res.status(200).json({message: "Delete Success!"})
                }
            })
            .catch(err => {
                return next(err)
            })
    }

}


module.exports = ProjectController