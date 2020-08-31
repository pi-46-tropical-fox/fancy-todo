const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const generateToken = (user)=> {
    const access_token = jwt.sign({ 
        username: user.name, 
        id: user.id},
        secret);
        console.log('jalan');
    return access_token
}

const verifyToken = (token => {
     return jwt.verify(token,secret)
})


module.exports = {generateToken, verifyToken}
