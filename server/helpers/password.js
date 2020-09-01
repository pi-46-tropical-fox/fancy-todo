const bcrypt = require('bcryptjs')

function hashPassword(password){
    if(password != ''){
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        password = hash
    }
    return password
}

function checkPassword(reqPassword,userPassword){
    isValid = bcrypt.compareSync(reqPassword, userPassword)
    return isValid
}


module.exports = {hashPassword, checkPassword}