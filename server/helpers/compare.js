let bcrypt = require('bcryptjs')

let comparePassword = (inputPass, password) => {
    const isValid = bcrypt.compareSync(inputPass, password)
    return isValid
}


module.exports = { comparePassword }