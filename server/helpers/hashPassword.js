const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

function hashPassword(userData){
  let hashedPassword = bcrypt.hashSync(userData.password, salt);
  return hashedPassword
}

module.exports = hashPassword