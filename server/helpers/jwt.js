const jwt = require(`jsonwebtoken`)

module.exports = {
    access_token: (username, UserId) => {
        return jwt.sign({ username, UserId }, process.env.SECRET)
    },

    verify_token: (token) => {
        return jwt.verify(token, process.env.SECRET)
    }
}
