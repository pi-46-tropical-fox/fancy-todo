const router = require('express').Router();
const UserController = require('../controllers/UserController');
const GithubController = require('../controllers/GithubController');
const { authentication } = require('../middlewares/auth');
const errorHandler = require('../middlewares/errorHandler');

router.get('/', (req, res) => res.send('Hello!!'));

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(authentication);

router.get('/github/user/:username', GithubController.getUser);

router.use(errorHandler)

module.exports = router;
