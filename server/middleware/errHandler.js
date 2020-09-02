function errHandler(err, req, res, next) {
    let msg = []
    
    if(Array.isArray(err.msg)){
        msg = err.msg.map(message => message)
    } else {
        msg.push(err.msg)
    }

    res.status(err.code).json({ msg })
}

module.exports = errHandler