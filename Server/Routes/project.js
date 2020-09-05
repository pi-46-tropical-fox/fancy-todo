const projectRoutes = require('express').Router()
const ProjectController = require('../Controller/ProjectController')
const { authentication, authorization, createProjectAuthr } = require('../Middlewares/auth')

//Create Project
projectRoutes.post('/projects', authentication, ProjectController.addProject)

//Show All Project
projectRoutes.get('/projects', authentication, ProjectController.readAllProjects)

//Select Project Owned by Authorized Project Manager
projectRoutes.get('/projects/:id',  authentication, ProjectController.selectProject)

//Update Project Owned by Authorized Project Manager
projectRoutes.put('/projects/:id',  authentication, ProjectController.updateProject)

//Delete Project Owned by Authorized Project Manager
projectRoutes.delete('/projects/:id', authentication, ProjectController.deleteProject)

module.exports = projectRoutes