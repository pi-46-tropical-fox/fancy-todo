const fs = require('fs')
const logsPath = './logs'
const dateNow = new Date(Date.now()).toISOString()
const errorsPath = `${logsPath}/error-${dateNow.split('T')[0]}.log` // daily error log

function errHandler(err, req, res, next) {
    let code = err.code || 500
    let error = {
        msg: [],
        stack: err
    }

    console.log(err);
    if(err.name){
        switch(err.name){
            case 'SequelizeValidationError':
                err.errors.forEach(e => {
                    error.msg.push(`${e.path}: ${e.message}`)
                })
            break
            case 'SequelizeUniqueConstraintError':
                err.errors.forEach(e => {
                    error.msg.push(`${e.type}: ${e.message}`)
                })
            break
            case 'JsonWebTokenError':
            default:
                error.msg.push(`Oops! Something wrong happened on our end. Don't worry, we'll get this thing done fast.`)
            break
        }
    } else if(err.code) {
        error.msg.push(err.msg)
    }
    let errorMsg = `${dateNow} - ${err}\n`
    fs.appendFileSync(errorsPath, errorMsg)

    if(!process.env.DEBUG) delete error.stack

    res.status(code).json(error)
}

module.exports = errHandler