const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
//##################################
const generateToken = (user) => {
    return jwt.sign({ username: user.username, id: user.id }, secret);

}
const verifyToken = (token) => {
    const verified = jwt.verify(token, secret)
    return verified
}

module.exports = { generateToken, verifyToken }