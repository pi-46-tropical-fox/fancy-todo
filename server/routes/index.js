const router = require('express').Router()
const todo = require('./todo')
const user = require('./user');

router.get('/', (req, res) => {
    res.send('home')
})

router.use('/todos', todo)
router.use('/user', user)

module.exports = router
