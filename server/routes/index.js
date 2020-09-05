const router = require('express').Router()
const todo = require('./todo')
const UserController = require('../controllers/UserController')
const {authentication} = require('../middleware/auth')
const FoodController = require('../controllers/FoodController')

router.get('/', (req, res) => {
    res.send('home')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)

router.use(authentication)

router.use('/todos', todo)

//3rd API Foods
router.get('/foods', FoodController.getResto)


module.exports = router
