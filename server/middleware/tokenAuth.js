const { JsonWebTokenError } = require("jsonwebtoken")

const jwt = require('jsonwebtoken')

const tokenAuth = (req,res,next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, process.env.SECRET, (err,user)=>{
            if (err) return res.status(403).json(err)
            req.user = user
            next()
        })
    } else res.status(401)
}

module.exports = tokenAuth