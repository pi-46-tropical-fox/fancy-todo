const bcrypt = require('bcryptjs')

let comparePass = (inputPass, password) => {
    let isValid = bcrypt.compareSync(inputPass, password);
    return isValid
}

module.exports = { comparePass }