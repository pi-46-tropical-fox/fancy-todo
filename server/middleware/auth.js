const {verifyToken} = require('../helpers/generateJWT');
const {Todo, User} = require('../models');

const authentication = async (req,res,next) => {
    // console.log(req.headers, "ini authentication...")
    
    const {acces_token} = req.headers // saat login ia mengenerate token yang disimpan pada req.headers
    // const acces_token = req.headers.acces_token

    try {
        const userData = verifyToken(acces_token) // oh ya ada tokennya nih
        // isi tokennya (id) dicek ke database
        let user = await User.findOne({
            where: {
                email: userData.email
            }
        })

        if(user) { // kalau ada lanjut
            req.userData = userData // disimpan untuk dipakai pada proses2 selanjutnya
            next()
        } else {
            throw {message: "User not autenticated", statusCode: 401}
        }

    } catch (err) {
        console.log(err, "ini error auth")
        // res.status(401).json({message: "User not autenticated"})
        return next(err)
    }
}

const authorization = async (req,res,next) => {
    const {id} = req.params // todo

    try {
        const todo = await Todo.findByPk(id)

        if(todo && todo.UserId === req.userData.id) { // dicocokin userId todo dg userId pada token
            next()
        } else {
            return res.status(403).json({message: "forbidden access"})
        }
    } catch (err) {
        return res.status(403).json({message: "forbidden access"})
    }
}

module.exports = {
    authentication, authorization
};
