const router = require('express').Router()
const Controller = require('../controllers/todoController')


router.get('/', Controller.show)
router.post('/add', Controller.add)
router.get('/edit/:id', Controller.find)
router.put('/edit/:id', Controller.edit)
router.delete('/delete/:id', Controller.delete)

module.exports = router