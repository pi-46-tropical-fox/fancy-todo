'use strict'

const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
  const { access_token } = req.headers

  try {
  // Decode access_token
    const userData = await verifyToken(access_token)
    let user = await User.findOne({ where : { email : userData.email } })

    if (user) {
      req.userData = userData
      next()
    } else {
      throw { message : 'User is not authenticated', statusCode : 401 }
    }
  } catch (err) {
    return next (err)
  }
}


module.exports = { authentication }