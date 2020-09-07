function errorHandler (err, req, res, next) {

  let errors = []
  let statusCode = 500
  console.log(err.name, "<<<<<<<<");
  console.log(err);

  // SequelizeUniqueConstraintError --register
  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    err.errors.forEach(error => {
      errors.push(error.message)
    });
    console.log(errors);
    statusCode = 400
  } 
  if (err.name === 'JsonWebTokenError') {
    errors.push('User is not authenticated')
    statusCode = 401
  } 
  // else if (err.errors[0].type === 'Validation error') {
  //     while (!err.message) {
  //     errors.push(err.message)
  //   }
  // }
  else {
    errors.push(err.message)
    statusCode = err.statusCode || 500
  }
  return res.status(statusCode).json({ errors })

}


module.exports = errorHandler