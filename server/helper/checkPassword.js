const bcrypt = require('bcryptjs')

function checkPassword(reqPassword,userPassword){
    isValid = bcrypt.compareSync(reqPassword, userPassword)
    return isValid
}

module.exports = checkPassword