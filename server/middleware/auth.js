const { verifyToken } = require("../helpers/jwt");
const { Todo, User } = require('../models');
//proses utuk cek token valid atau tidak
//access token disiman di req.headers
const authentication = async(req, res, next) => {
    const { access_token } = req.headers;
    try {
        const userData = verifyToken(access_token);
        let user = await User.findOne({ where: { username: userData.username } })
        if (user) {
            req.userData = userData;
            next()
        } else {
            throw { message: 'User is not authenticated', statusCode: 401 }
        }
    } catch (err) {
        return next(err)
    }

    // console.log(req.headers);
    // //assume that this has already been aded to the headers right after logging in
    // const { access_token } = req.headers;
    // try {
    //     //verify token
    //     const userData = verifyToken(access_token);
    //     console.log(userData, '<<< user data dari authentication');
    //     //lookup databse for specified user
    //     let user = await User.findOne({ where: { username: userData.username } });
    //     //conditional
    //     if (user) {
    //         req.userData = userData;
    //         next()
    //     } else {
    //         throw { message: "User is not authenticated", statusCode: 401 }
    //     }
    //     console.log(userData)
    // } catch (err) {
    //     return next(err)
    // }
}

//req.params will carry Todo's id
//req.userData will be carried out as well from previous authentication
const authorization = async(req, res, next) => {
    const { id } = req.params;
    try {
        const target = await Todo.findByPk(id);
        if (target && target.UserId === req.userData.id) {
            next()
        } else {
            throw { message: "Access Forbiden", statusCode: 403 }
        }
    } catch (err) {
        next(err)
    }

}


module.exports = { authentication, authorization }