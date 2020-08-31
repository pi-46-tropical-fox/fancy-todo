const jwt = require(`jsonwebtoken`)

const secret = process.env.SECRET

module.exports = {
    access_token: (username, id) => {
        return jwt.sign({ username, id }, secret)
    },

    verify_token: (token) => {
        return jwt.verify(token, secret)
    }
}
