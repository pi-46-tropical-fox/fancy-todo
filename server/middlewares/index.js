const {authentication, authorization} = require(`./auth`) 
const errHandler = require(`./errHandler`)

module.exports = {
    authentication,
    authorization,
    errHandler
}