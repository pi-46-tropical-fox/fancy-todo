const router = require('express').Router()
const userRouter = require('./user.js')
const todoRouter = require('./todo.js')
const {authentication} = require('../middlewares/auth.js')

router.get('/', (req,res) => {
    res.send("Hello Kak")
})


router.use('/user', userRouter)

router.use(authentication)

router.use('/todos', todoRouter)





module.exports = router