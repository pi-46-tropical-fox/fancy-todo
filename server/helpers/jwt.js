const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const tokenGenerator = (data) => {
    let token = jwt.sign({ 
        email: data.email, 
        id: data.id 
    }, secret);

    return token 

}

const tokenVerificator = (data) => {
    return jwt.verify (data, secret)
}

module.exports = {tokenGenerator, tokenVerificator }