const bcryptjs = require('bcryptjs')

const createHash =(password) => {
    const salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password, salt)
}


const validateUser = (password, userPassword) => {
    return bcryptjs.compareSync( password, userPassword)
}

module.exports = { validateUser, createHash }