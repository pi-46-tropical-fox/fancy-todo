const bcrypts = require('bcryptjs')

const validateUser = (password, userPassword) => {
    return bcrypts.compareSync( password, userPassword)
}

module.exports = validateUser