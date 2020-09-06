const bcrypt = require ('bcrypt')

const compare = (password, encodedPassword) => {
    let output = bcrypt.compareSync (password, encodedPassword)

    return output
}

module.exports = {compare}