function errorHandler (err, req, res, next) {
    // console.log('err handler >>>', err, '<<< error handler')
    let statusCode = 500
    let errors = []

    //TambahAPI3rdpartyerror
    switch(err.name) {
        //UNIQUE CONSTRAINT BELUM MASUK!
        case 'SequelizeValidationError':
            // console.log(err, '<< masuk sini')
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