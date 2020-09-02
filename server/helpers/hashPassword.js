const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12)

function hashPassword(data) {
    let hashedPassword = bcrypt.hashSync(data.password, salt)
    return hashedPassword
}

function comparePassword(pasw1,pasw2) {
   let compare = bcrypt.compareSync(pasw1,pasw2)
   return compare
}

module.exports = {hashPassword,comparePassword}
