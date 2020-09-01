const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/', (req, res) => res.send('Hello!!'));

router.post('/register', UserController.register);

module.exports = router;
