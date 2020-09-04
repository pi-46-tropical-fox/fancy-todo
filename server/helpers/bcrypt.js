const bcrypt = require('bcrypt')

const saltRounds = 10
const compareBcrypt = (password, hashPassword) => {
    const result = bcrypt.compareSync(password, hashPassword)
    return result
}

const hashingPassword = (user)=> {
    user.password = bcrypt.hashSync(user.password, saltRounds)
}

module.exports = {compareBcrypt, hashingPassword}