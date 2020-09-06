let bcrypt = require('bcryptjs')

function hash(user) {
    return new Promise((resolve, error) => {
        bcrypt.hash(user.password, 15, (err, hash) => {
            if (err) { return error(err) }
            resolve(hash)
        })
    })
}

function compare(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
        .then((res) => {
            return res
        });
}

module.exports = {
    hash,
    compare
}