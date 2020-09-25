const bcrypt = require('bcrypt')

function comparePassword(key, value) {
    return bcrypt.compareSync(key, value)
}

module.exports = { comparePassword };