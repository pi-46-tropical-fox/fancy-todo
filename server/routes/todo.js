'use strict'

const router = require('express').Router()
const TodoController = require('../controllers/todo')
const { authentication } = require('../middlewares/authentication')
const { authorizationTodo } = require('../middlewares/authorizeTodo')
const WeatherController = require('../controllers/weather')
const PexelController = require('../controllers/pexel');


router.get('/weather', WeatherController.getWeather)
router.get('/pexels', PexelController.getPexel)

router.use(authentication) 
router.get('/', TodoController.getTodos)
router.post('/', TodoController.createTodo)

router.get('/:id', authorizationTodo, TodoController.getOne)
router.put('/:id', authorizationTodo, TodoController.editTodo)
router.delete('/:id', authorizationTodo, TodoController.removeTodo)


module.exports = router