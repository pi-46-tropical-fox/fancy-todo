const bcrypt = require('bcryptjs')

const compareHash = (str, hash) => {
    return bcrypt.compareSync(str, hash)
}

const createHash = (str) => {
    let salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(str, salt)
}

const generateRandomPassword = (length = 15, hashNeeded = true) => {
    const dict = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890~!@#$%^&*()_+`-=[];\'\\,./{}|:"<>?'
    let res = ''

    while(length--){
        res += dict[Math.floor(Math.random() * dict.length)]
    }

    return hashNeeded ? createHash(res) : res
}

module.exports = {
    // compares a string against a hash
    compareHash,

    // creates a hash from a string
    createHash,

    // generate random password
    generateRandomPassword
}