function errorHandler (err, req, res, next) {
    console.log(err, '<<< ini dari error handler');
    let statusCode = 500
    let errors = []

    switch(err.name) {
        case 'SequelizeUniqueConstraintError':
        case 'SequelizeValidationError':
            err.errors.forEach(el => {
                errors.push(el.message)
            });
            statusCode = 400
            break
        case 'JsonWebTokenError':
            errors.push('User not authenticated')
            statusCode = 401
            break
        default:
            errors.push(err.message)
            statusCode = err.statusCode || 500

    }


    res.status(statusCode).json({errors})   
}

module.exports = errorHandler 