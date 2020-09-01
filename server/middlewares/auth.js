const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models')

const authentication = async (req, res, next) => {
  console.log(req.headers, 'ini authentication');

  const { access_token } = req.headers

  try {
    const userData = verifyToken(access_token)

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

const authorization = (req, res, next) => {

}

module.exports = { authentication, authorization }