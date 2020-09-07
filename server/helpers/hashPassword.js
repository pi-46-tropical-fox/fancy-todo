const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(12)

function hashPassword(data) {
    // let hashedPassword = bcrypt.hashSync(data.password, salt)
    // return hashedPassword
    return bcrypt.hashSync(data, salt)
}

function comparePassword(pasw,paswHash) {
//    let compare = bcrypt.compareSync(pasw1,pasw2)
//    return compare
    return bcrypt.compareSync(pasw,paswHash)
}

module.exports = {hashPassword,comparePassword}