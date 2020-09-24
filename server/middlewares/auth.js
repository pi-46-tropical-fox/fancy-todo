const { verifyToken } = require("../helpers/jwt.js");
const { Todo, User } = require("../models");


// process to check if token is valid or not
// token / access_token is saved in req.headers

const authentication = async (req, res, next) => {
  console.log(req.headers, "this is authentication");

  const { access_token } = req.headers;

  try {
    // verify token
    const userData = verifyToken(access_token);
    console.log(userData, "this is userData");

    // find user in database
    let user = await User.findOne({
      where: {
        email: userData.email
      }
    });

    if (user) {
      req.userData = userData;
      next();
    } else {
      throw { message: "User is not authenticated", statusCode: 401 };
    }

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
      throw { message: "Unauthorized Access", statusCode: 403 };
    }
  } catch (err) {
    console.log("<<<< error in authorization");
    return next(err);
  }
}

module.exports = { authentication, authorization };