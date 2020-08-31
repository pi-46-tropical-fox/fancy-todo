const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12)

function hashPassword(data) {
    let hashedPassword = bcrypt.hashSync(data.password, salt)
    return hashedPassword
}

module.exports = hashPassword
