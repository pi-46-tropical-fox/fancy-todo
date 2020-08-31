const bcrypt = require('bcrypt')

const compareBcrypt = (password, hashPassword) => {
    const result = bcrypt.compareSync(password, hashPassword)
    return result
}


module.exports = {compareBcrypt}