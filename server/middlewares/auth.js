const { verifyToken } = require('../helpers/jwt');
const { User, Todo } = require('../models')

const authentication = async (req, res, next) => {
  console.log(req.headers, 'ini authentication');

  const { access_token } = req.headers

  try {
    const userData = verifyToken(access_token)
    console.log(userData);
    let user = await User.findOne({
      where: {
        email: userData.email
      }
    })
    if (user) {
      req.userData = userData
      next()
    } else {
      throw { message: 'User not authenticated', statusCode: 401 }
    }

  } catch (err) {
    // res.status(401).json({ message: 'user not authenticated' })
    return next(err)
  }
}
  const authorization = async (req, res, next) => {
    const { id } = req.params
  
    try {
      const todo = await Todo.findByPk(id)
  
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