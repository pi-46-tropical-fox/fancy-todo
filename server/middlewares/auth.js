const {verifyToken} = require("../helpers/userToken")
const {User, Todo} = require("../models")
async function authentication (req, res, next){
  try {
    let userData = verifyToken(req.headers.access_token);
    let userDataDb = await User.findByPk(userData.id)
    if (userDataDb && userDataDb.id === userData.id){
      req.userData = userData
      next()
    }
    else {
      error = Error ()
      error.name = "401"
      error.message= "Unauthenticated user"
      throw error
    }
  } catch(err) {
    next(err)
  }

  
}

async function todoAuthorization (req, res, next){
  try{
    const {id} = req.params
    let userData = verifyToken(req.headers.access_token);
    let todoData = await Todo.findByPk(id)
    // console.log();
    if (!todoData){
      let error = Error ()
      error.name = "404"
      error.message= "Data not found"
      throw error
    }
    else if (todoData.UserId === userData.id){
      next()
    }
    else {
      let error = Error ()
      error.name = "401"
      error.message= "User are unauthorized to access this data"
      throw error
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {authentication, todoAuthorization}