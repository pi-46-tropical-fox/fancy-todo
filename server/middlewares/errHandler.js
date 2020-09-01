

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
        // case ""
        default:
            break;
    }
    res.status(500).json({errors})
}

module.exports = errHandler