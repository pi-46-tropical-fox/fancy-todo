const bcrypt = require('bcryptjs');

const compare = (input, realPassword) => {
    return bcrypt.compareSync(input, realPassword)
}

const hash = (password) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

module.exports = { compare, hash }