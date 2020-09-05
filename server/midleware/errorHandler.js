'use strict'

function errHandler(err, req, res, next){
//console.log(err, "-------");
let status = 500
let errors = []
switch(err.name){
    case "SequelizeValidationError":
        err.errors.forEach(element => {
            errors.push(element.message)
        });
        
    break;
    case "SequelizeDatabaseError":

        break
    case "NOT_FOUND" :

    break;

    case "JsonWebTokenError" :
        res.status(401).json({
            error: 'Please login for access this page.'
          })
    break;

    case "INVALID_ACCOUNT" :

    break;

    default:
}
res.status(500).json(err)
}

module.exports = errHandler