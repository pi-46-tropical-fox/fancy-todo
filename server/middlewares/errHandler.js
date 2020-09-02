function errHandler (err,req,res,next) {
    console.log('>>>>>>>>>>>>>>',err.name,'<<<<<<<<<<< ini error');

    let statusCode
    let errors = []

    switch(err.name) {
        case 'JsonWebTokenError' :
            errors.push("User not authenticated")
            statusCode = 401
            break
        case 'SequelizeUniqueConstraintError': //unique ga bareng
        case 'SequelizeValidationError':
            err.errors.forEach(error => {
                errors.push(error.message)
            });
            statusCode = 401
            break
        default:
            errors.push(err.msg)
            statusCode = err.statusCode || 500
    }
    // console.log(statusCode, 'ini status code');
    // console.log(errors, 'ini errors');
    res.status(statusCode).json({errors})
}

module.exports = errHandler