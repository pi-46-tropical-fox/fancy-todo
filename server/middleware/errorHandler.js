function errorHandler(err, req, res, next) {
    console.log(err, '<<< error dari error handler');
    let statusCode = 500,
        errors = [];

    switch (err.name) {
        case "SequelizeConnectionRefusedError":
            errors.push('Internal Server Error: Databse is currently offline.')
            statusCode = 500;
            break;
        case "SequelizeValidationError":
            err.errors.forEach(el => {
                errors.push(el.message)
            });
            statusCode = 400;
            break;
        case "JsonWebTokenError":
            errors.push('User is not authenticated')
            statusCode = 401;
            break;
        default:
            errors.push(err.message);
            statusCode = err.statusCode || 500;
    }
    res.status(statusCode).json({ errors })
}



module.exports = errorHandler