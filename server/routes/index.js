const router = require('express').Router()
const todo = require('./todo')
const UserController = require('../controllers/UserController')
const {authentication} = require('../middleware/auth')

router.get('/', (req, res) => {
    res.send('home')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)

router.use('/todos', todo)


module.exports = router
