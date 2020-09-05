const { verifyToken } = require('../helpers/jwt')
const { Todo, User } = require('../models')

const authentication = async (req, res, next) => {
    // console.log(req.headers, 'ini req.headers')
    const { access_token } = req.headers

    try {
        const userData = verifyToken(access_token)
        // req.useruserData = userData
        let user = await User.findOne({ where: { email: userData.email } })
        if (user) {
            req.userData = userData
            next()
        } else {
            throw { message: 'User authentication failed' }
        }
    } catch (err) {
        // res.status(401).json({ message: 'User authentication failed' })
        console.log(err, 'ini error authentication')
        next(err)
    }

}

const authorization = async (req, res, next) => {
    const { idTodo } = req.params
    console.log(idTodo, '<<<di authorization')
    try {
        const todo = await Todo.findByPk(idTodo)
        console.log(req.userData.id, '<<<ini req.userData di authorization')
        console.log(todo.UserId, '<<<ini todo.UserId')
        if (todo && todo.UserId === req.userData.id) {
            next()
        } else {
            return res.status(403).json({ message: 'Forbidden access' })
        }
    }
    catch {
        return res.status(403).json({ message: 'Forbidden access' })
    }
}

module.exports = { authentication, authorization }