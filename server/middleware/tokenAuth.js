const jwt = require('jsonwebtoken')
const {User} = require('../models/index')

const tokenAuth = async (req,res,next) => {
    const authHeader = req.headers.authorization
    try {
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            let verified = jwt.verify(token, process.env.SECRET)
            const userDB = await User.findOne({where:{email: verified.email}})
    
            if (verified) {
                // console.log(verified);
                req.userData = userDB
                // console.log(req.header.UserID.id);
                next()
            } else {
                throw res.status(400).json({message: 'unauthorized'})
            }
    
            // jwt.verify(token, process.env.SECRET, (err,user)=>{
            //     if (err) return res.status(403).json(err)
            //     req.user = user
            //     next()
            // })
        }
    } catch (err) {
        res.status(401).json({message:'not found'})
    }
}

module.exports = tokenAuth