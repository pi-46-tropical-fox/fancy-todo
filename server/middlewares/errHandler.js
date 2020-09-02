function errorHandler (err, req, res, next) {
    let statusCode = 500
    let errors = []

    switch(err.name) {
        case 'SequelizeValidationError':
            err.errors.forEach(element => {
                errors.push(element.message)
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
    // res.status(statusCode).json({err})      
}

module.exports = errorHandler 