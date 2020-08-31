const bcrypt = require('bcryptjs')

const comparePassword = (password, hash) => {
    let hasValid = bcrypt.compareSync(password, hash)
    return hasValid
}

module.exports = { comparePassword }