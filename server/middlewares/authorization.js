// const { verifyToken } = require('../helpers/jwt');
// const { Todo } = require('../models');
// const TodoController = require('../controllers/TodoController');

// const authorization = async (req, res, next) => {
//   const { id } = req.params

//   try {
//     const todo = await TodoController.findByPk(id)

//     if(todo && todo.UserId === req.userData.id) {
//       next()
//     } else {
//       throw { message: 'forbidden access', statusCode: 403 }
//     }
//   } catch(err) {
//     return next(err)
//   }

// }

// module.exports = {authorization}