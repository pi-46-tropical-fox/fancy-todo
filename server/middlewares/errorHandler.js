function errorHandler (err, req, res, next) {

  let errors = []
  let statusCode = 500
  if (err.name === 'SequelizeValidationError') {
    err.errors.forEach(error => {
      errors.push(error.message)
    });
    statusCode = 400
  } 
  if (err.name === 'JsonWebTokenError') {
    errors.push('User is not authenticated')
    statusCode = 401
  } else if (err.errors[0].type === 'Validation error') {
      while (!err.message) {
      errors.push(err.message)
    }
  }
  else {
    errors.push(err.message)
    statusCode = err.statusCode || 500
  }
  return res.status(statusCode).json({ errors })

}


module.exports = errorHandler