function errorHandler (err,req,res,next){
    console.log(err)
    let statusCode = 500
    let error = []

    switch (err.name){
        case "SequelizeValidationError":
            err.errors.forEach(el=>{
                error.push(el.message)
            })
            statusCode = 400
        break
        case "JsonWebTokenError":
                error.push(err.message)
            statusCode = 400
        break
        default:
            error.push(err.message)
            statusCode = err.statusCode
    }

res.status(statusCode).json({errors: error})

}

module.exports = errorHandler