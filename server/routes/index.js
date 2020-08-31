const router = require('express').Router();
const Controller = require('../controller/Controller');
//#################################
// router.get('/', (req, res) => {
//     res.status(200).json({ msg: 'Welcome to phase 2' })
// });
router.get('/todos', Controller.showAllTodo);
router.post('/todos', Controller.addTodo);
router.get('/todos/:id', Controller.showTodo);
router.put('/todos/:id', Controller.update);
router.delete('/todos/:id', Controller.delete)

module.exports = router