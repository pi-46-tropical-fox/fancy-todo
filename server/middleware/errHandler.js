const errHandler = (err, req, res, next) => {
    let statusCode
    let errors = []
    if(err.name === 'SequelizeValidationError'){
        statusCode = 400
        for(const el of err.errors){
            errors.push(el.message)
        }
    }else if(err.name === 'SequelizeUniqueConstraintError'){
        statusCode = 400
        errors.push('Email already exists, please use another email')
    }else if(err.name === 'InvalidEmailPassword'){
        statusCode = 400
        errors.push('Email or Password is incorrect')
    }else if(err.name === 'TodoNotFound'){
        statusCode = 404
        errors.push(`Todo's id not found`)
    }else if(err.name === 'NotAuthenticated'){
        statusCode = 401
        errors.push(`User not authenticated`)
    }else if(err.name === 'JsonWebTokenError'){
        statusCode = 401
        errors.push(`User not authenticated`)
    }else if(err.name === 'ForbidenAccess'){
        statusCode = 403
        errors.push(`Forbiden access`)
    }else if(err.name === 'apiKeyInvalid'){
        statusCode = 401
        errors.push('User not authenticated')
    }else{
        statusCode = 500
        errors.push('Internal server error')
    }
    res.status(statusCode).json({errors})
}

module.exports = errHandler