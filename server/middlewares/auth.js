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
    console.log("<<<< error in authentication");
    return next(err);
  }
}

const  authorization = async (req, res, next) => {
  console.log("this is authorization");
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(+id);
    if (todo === null) {
      throw({ message: "Not Found", statusCode: 404 });
    }
     else if (todo && todo.UserId === req.userData.id) {
      next();
    } else {
      throw({ message: "Unauthorized Access", statusCode: 403 });
    }
  } catch (err) {
    console.log("<<<< error in authorization");
    return next(err);
  }
}

module.exports = { authentication, authorization };