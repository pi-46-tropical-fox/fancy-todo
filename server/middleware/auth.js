const { verifyToken } = require("../helpers/jwt");
const { Todo } = require('../models');
//proses utuk cek token valid atau tidak
//access token disiman di req.headers
const authentication = (req, res, next) => {
    console.log(req.headers);
    //assume that this has already been aded to the headers right after logging in
    const { access_token } = req.headers;

    try {
        const userData = verifyToken(access_token)
        req.userData = userData
        console.log(userData)
        next()
    } catch (err) {
        console.log(err, 'ini error auth')
        res.status(401).json({ message: "User is not authenticated" })
    }
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
            return res.status(403).json({ message: "Access Forbiden" })
        }
    } catch (err) {
        return res.status(403).json({ message: "Access Forbiden" })
    }

}


module.exports = { authentication, authorization }