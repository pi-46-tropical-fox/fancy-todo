const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
//untuk lebih menjaga secret, butuh package .env

const generateToken = (user) => {
    return jwt.sign({ username: user.username, id: user.id }, secret);

}
const verifyToken = (token) => {
    return jwt.verify(token, secret)
}

module.exports = { generateToken, verifyToken }