const error = (err,req,res,next)=>{
    console.log(err)
    let status = 500
    let errors = []

    switch(err.name){
        case "SequelizeValidationError":
            err.errors.forEach(i=>{
                errors.push(i.message)
            })
            status = 400;
            break;
        case "JsonWebTokenError":
            errors.push(`doesnt recognize user`)
            status = 401;
            break;
        case "SequelizeUniqueConstraintError":
            errors.push(`email already used`)
            status = 400;
            break;
        default :
            errors.push(err.message)
            status = err.status || 500
            break

    }
    res.status(status).json({errors})

}

module.exports = error