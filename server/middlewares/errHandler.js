

function errHandler(err,req,res,next){
    let errors = []
    let statusCode = 500
    console.log(err,'masuk error handler')
    switch (err.name) {
        case "SequelizeValidationError":
            err.errors.forEach(datum => {
                errors.push(datum.message)
            });
            statusCode = 400
            break;
        case "JsonWebTokenError":
            errors.push('Jwt tidak masuk')
            statusCode = 401
            break;
        default:
            errors.push(err.message)
            statusCode = err.statusCode 
            break;
    }
    res.status(statusCode).json({errors})
}

module.exports = errHandler