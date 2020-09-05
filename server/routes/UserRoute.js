const router = require('express').Router()
const UserController = require('../controllers/UserController')
const GoogleController = require('../controllers/googleController')


router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/loginGoogle', GoogleController.loginGoogle)


module.exports = router;