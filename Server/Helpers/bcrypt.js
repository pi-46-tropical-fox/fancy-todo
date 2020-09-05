const bcrypt = require('bcryptjs')

function comparePassword(inputPassword, hashPassword) {
    const result = bcrypt.compareSync(inputPassword, hashPassword);

    return result
}

module.exports = comparePassword