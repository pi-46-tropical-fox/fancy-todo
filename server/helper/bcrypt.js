const bcrypt = require('bcrypt')
const salt = 10;

function hashPassword(plainPassword){
    return bcrypt.hashSync(plainPassword, salt)
}

function comparePassword(plainPassword, hashedPassword){
    return bcrypt.compareSync(plainPassword, hashedPassword)
}

module.exports = {hashPassword, comparePassword}