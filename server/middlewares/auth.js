const { verifyToken } = require('../helpers/jwt');
const { User, Todo } = require('../models')

const authentication = async (req, res, next) => {
  // console.log(req.headers, 'ini authentication');

  const { access_token } = req.headers

  try {
    const userData = verifyToken(access_token)
    let user = await User.findOne({
      where: {
        email: userData.email
      }
    })
    // console.log(user,'<<<< user');
    if (user) {
      req.userData = user
      next()
    } else {
      throw { message: 'User not authenticated', statusCode: 401 }
    }

  } catch (err) {
    return next(err)
  }
}
const authorization = async (req, res, next) => {
  const { id } = req.params

  try {
    const todo = await Todo.findByPk(id)
    console.log(todo, '<<<< ini todo');
    // console.log(req.userData.id, '<<<<       ini userData.id');
    // console.log(todo.UserId, 'ini userId');
    if(todo && todo.UserId === req.userData.id) {
      next()
    } else {
      throw { message: 'forbidden access', statusCode: 403 }
    }
  } catch(err) {
    return next(err)
  }
}

module.exports = { authentication, authorization}