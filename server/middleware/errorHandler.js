module.exports = function(err, req, res, next) {
    let statusCode = 500
    let errorCode = 'Unknown_Error'

    if(err.name === 'SequelizeValidationError') {
        statusCode = 400
        errorCode = 'Validation_Error'
        const msg = []
        for(let i = 0 ; i < err.errors.length; i++) {
            msg.push(err.errors[i].message)
        }
        message = msg.join(', ')
    } 
    else if(err.name === 'EMAIL_ALREADY_EXIST') {
        console.log(err.name)
        statusCode = 400
        errorCode = 'EMAIL_ALREADY_EXIST'
        message = 'Email Already Exist'
    } 
    else if(err.name === 'INVALID_EMAIL/PASSWORD') {
        statusCode = 400
        errorCode = 'INVALID_EMAIL/PASSWORD'
        message = 'Invalid Email/Password'
    } 
    else if(err.name === 'ERROR_NOT_FOUND') {
        statusCode = 404
        errorCode = 'ERROR_NOT_FOUND'
        message = 'Error Not Found'
    }

    res.status(statusCode).json({errorCode, message})
}