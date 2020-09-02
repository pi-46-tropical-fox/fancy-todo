const bcrypt = require(`bcryptjs`)

module.exports = {
    compare: (bodyPwd, userPwd) => {
        return bcrypt.compareSync(bodyPwd, userPwd)
    },
    
    hashing: (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
}