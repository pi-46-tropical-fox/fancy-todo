'use strict'

function errHandler(err, req, res, next){
console.log(err, "-------");
switch(err.name){
    case "SequelizeValidationError":
        
    break;

    case "NOT_FOUND" :

    break;

    case "JsonWebTokenError" :

    break;

    case "INVALID_ACCOUNT" :

    break;

    default:
}
res.status(500).json(err)
}

module.exports = errHandler