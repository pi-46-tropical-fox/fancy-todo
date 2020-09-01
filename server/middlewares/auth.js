const { verifyToken } = require('../helpers/jwt')
const { Todo, User } = require('../models')

const authentication = async (req, res, next) => {
    // console.log(req.headers, 'ini req.headers')
    const { access_token } = req.headers

    try {
        const data = verifyToken(access_token)
        // req.userData = data
        let user = await User.findOne({ where: { username: data.username } })
        if (user) {
            req.userData = data
            next()
        } else {
            throw { message: 'User authentication failed' }
        }
    } catch (err) {
        res.status(401).json({ message: 'User authentication failed' })
        console.log(err, 'ini error authentication')
        next()
    }

}

const authorization = async (req, res, next) => {
    const { todoId } = req.params
    try {
        const todo = await Todo.findByPk(todoId)
        console.log(todoId, 'ini req.userData di authorization')
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