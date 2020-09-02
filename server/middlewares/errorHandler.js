function errorHandler (err, req, res, next){
  console.log("---------FROM ERROR HANDLER--------- \n", err )
  // res.status(400).json(err)
  let statusCode = 500
  let errors = []
  switch(err.name){
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      statusCode = 400
      err.errors.forEach(error => {
        errors.push(error.message)
      });
      break;
    case "JsonWebTokenError":
      switch(err.message){
        case "jwt malformed":
        case "invalid token":
          errors.push("unauthenticated user")
          statusCode = 401
          break;
        case "jwt must be provided":
          errors.push("user need to login")
          statusCode = 401
          break;
      }
      
      break;
    case "SequelizeValidationError":
      
      err.errors.forEach(error => {
        errors.push(error.message)
      });
      break;
    case "404":
      statusCode = 404
      errors.push(err.message)
      break;
    case "401":
      statusCode = 401
      errors.push(err.message)
      break;
    case "400":
      statusCode = 400
      errors.push(err.message)
      break;
    default:
      errors.push(err.message)
      statusCode = err.statusCode || 500
  }

  res.status(statusCode).json({errors})
}

module.exports= errorHandler;