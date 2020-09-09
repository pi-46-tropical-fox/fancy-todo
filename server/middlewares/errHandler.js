

function errHandler(err, req, res, next) {
    // console.log(err.name, '<<<<errorHandler register')
    let statusCode = 500
    let errors = []
    switch (err.name) {
        case 'SequelizeValidationError':
            err.errors.forEach(error => {
                errors.push(error.message)
            })
            statusCode = 400
            break;
        case 'JsonWebTokenError':
                errors.push('User authentication failed')
            statusCode = 401
            break;
        default:
            errors.push(err.message)
            statusCode = err.statusCode || 500
    }
    res.status(statusCode).json(errors)
}

module.exports = errHandler