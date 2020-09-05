const errHandler = (err, req, res, next) => {
    let statusCode = 500
    let errors = []
    // console.log(err)

    switch (err.name) {
        case 'SequelizeUniqueConstraintError':
        case 'SequelizeValidationError':
            err.errors.forEach(error => {
                errors.push(error.message)
            })
            statusCode = 400
            res.status(statusCode).json({errors})
        break; 
        case 'JsonWebTokenError':
            errors.push('User Not Authenticated')
            statusCode = 401
            res.status(statusCode).json({errors})
        break
        default:
            errors.push(err.message)
            statusCode = err.statusCode
            res.status(statusCode).json({errors})
        break;
    }
}

module.exports = errHandler