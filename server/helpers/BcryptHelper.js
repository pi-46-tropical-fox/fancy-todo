const bcrypt = require('bcryptjs')

module.exports = {
    // compares a string against a hash
    compareHash(str, hash){
        return bcrypt.compareSync(str, hash)
    },

    // creates a hash from a string
    createHash(str){
        let salt = bcrypt.genSaltSync()
        return bcrypt.hashSync(str, salt)
    }
}