function errorHandler (err, req, res, next) {
    // console.log (err)
    let errorStatus = 500
    let errors = []

    switch (err.name) {
        case "SequelizeValidationError" :
            err.errors.forEach (el => {
                errors.push(el.message)
            })
            errorStatus = 400
            break;

        case "JsonWebTokenError" :
            errors.push("Invalid User")
            errorStatus = 401
            break;

        default:
            errors.push (err.message)
            errorStatus = err.errorStatus || 500
            break;
        

    }

    res.status (errorStatus).json ({errors})


}

module.exports = errorHandler