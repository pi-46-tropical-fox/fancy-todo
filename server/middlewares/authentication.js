const { tokenVerificator } = require ("../helpers/jwt.js")

const authentication = (req, res, next) => {
    const {token} = req.headers

    try {
        const data = tokenVerificator (token)
        // console.log (data)
        next ()
    
    } catch (err) {
        return res.status (401).json ({message : "Invalid User"})

    }

}

module.exports = {authentication}