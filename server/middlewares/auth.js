const { verifyToken } = require("../helpers/jwt.js");
const { Todo, User } = require("../models");
// process to check if token is valid or not
// token / access_token is saved in req.headers

const authentication = (req, res, next) => {
  console.log(req.headers, "this is authentication");

  const { access_token } = req.headers;

  try {
    const userData = verifyToken(access_token);
    req.userData = userData;
    console.log(userData, "this is the data");

    next();

  } catch (err) {
    console.log(err, "this is error in auth");
    return res.status(401).json({ message: "Unauthorized", errors: [ err.message ] });
  }
}

const  authorization = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(+id);
    if (todo && todo.UserId === req.userData.id) {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  } catch (err) {
    return res.status(403).json({ message: "Forbidden" });
  }
}

module.exports = { authentication, authorization };