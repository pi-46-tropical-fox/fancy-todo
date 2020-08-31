const bcrypt = require(`bcryptjs`)

module.exports = (bodyPwd, userPwd) => {
    return bcrypt.compareSync(bodyPwd, userPwd)
}