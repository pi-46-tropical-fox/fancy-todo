'use strict'

function errHandler(err, req, res, next){
console.log(err.name);
switch(err.name){
    case "SequelizeValidationError":
        break;
}
res.status(500).json(err)
}

module.exports = errHandler