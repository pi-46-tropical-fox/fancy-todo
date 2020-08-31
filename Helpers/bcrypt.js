const bcrypt = require('bcryptjs')

function runBcrypt(inputPassword, hashPassword) {
    const result = bcrypt.compareSync(inputPassword, hashPassword);

    return result
}

module.exports = runBcrypt