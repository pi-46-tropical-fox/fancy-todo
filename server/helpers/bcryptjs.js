const bcryptjs = require('bcryptjs');

function passwordHasher(password) {
    let salt = bcryptjs.genSaltSync(10);
    let hash = bcryptjs.hashSync(password, salt);
    let result = hash
    return result
}

  module.exports = passwordHasher

