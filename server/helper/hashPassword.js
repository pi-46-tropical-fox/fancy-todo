const bcrypt = require('bcryptjs')

function hashPassword(password){
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    password = hash

    return password
}



module.exports = hashPassword