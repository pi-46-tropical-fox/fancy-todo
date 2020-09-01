const bcrypt = require('bcryptjs')

const hashed = (password) => {
    return bcrypt.hashSync(password)
}

const isValid = (password, checkedPsw) => {
    if (bcrypt.compareSync(password, checkedPsw)) {
        return true
    }
    return false
}

module.exports = {
    hashed,
    isValid
}