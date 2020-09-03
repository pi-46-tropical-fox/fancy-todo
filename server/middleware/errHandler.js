

function errHandler ( err, req, res, next) {
    console.log( err, '<<<<< ini dari error handler')
    let statusCode = 500
    let errors = []

    switch (err.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            
            err.errors.forEach(error => {
                errors.push(error.message)
            })
            statusCode = 400    
            break;

        case 'JsonWebTokenError':
            
            errors.push(err.message)
            statusCode = 401
            break;

        default:
            
            errors.push(err.message)
            statusCode = err.statusCode || 500

            break;
    }



    res.status(statusCode).json({errors})
}

module.exports = errHandler