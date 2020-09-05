const router = require('express').Router()
const Controller = require('../controllers/todoController')
const { authentication, authorization } = require('../middlewares/auth.js')


router.get('/', authentication, Controller.show)
// router.use(authentication)
router.post('/add', authentication, Controller.add)
router.get('/edit/:id', authentication, authorization, Controller.find)
router.put('/edit/:id', authentication,  authorization, Controller.edit)
router.delete('/delete/:id', authentication,  authorization, Controller.delete)

module.exports = router