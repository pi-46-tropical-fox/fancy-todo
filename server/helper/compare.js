let bcrypt = require('bcryptjs')

let compare = (inputPass , password)=>{
   const isValid =  bcrypt.compareSync(inputPass,password)
   return isValid
}

module.exports = compare