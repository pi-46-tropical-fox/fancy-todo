const router = require('express').Router()
const userRouter = require('./user.js')
const todoRouter = require('./todo.js')

router.get('/', (req,res) => {
    res.send("Hello Kak")
})


router.use('/todos', todoRouter)
router.use('/user', userRouter)





module.exports = router