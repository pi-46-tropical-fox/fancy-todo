const router = require('express').Router();
const Controller = require('../controller/Controller');
const UserController = require('../controller/UserController');
const apiController = require('../controller/APIController')
const { authentication, authorization } = require('../middleware/auth');
//#################################
router.post('/register', UserController.register);
router.post('/login', UserController.login);

//Get access_token, put it in headers
//AUTHENTICATE
//    ||
//    ||    
//  __||__
//  \    /
//   \  /
//    \/
router.use(authentication);
//Will carry req.userData, which can further be used for authorization
router.get('/todos', Controller.showAllTodo);
router.post('/todos', Controller.addTodo);
router.get('/todos/:id', authorization, Controller.showTodo);
router.put('/todos/:id', authorization, Controller.update);
router.delete('/todos/:id', authorization, Controller.delete)

//third party API
router.get('/articles/:input', apiController.getData);
router.get('/todos/articles/:id', apiController.findRelatedArticles)
module.exports = router