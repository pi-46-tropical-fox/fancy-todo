const { verifyToken } = require('../helpers/AuthHelper')
const { User, Todo } = require('../models')

const authenticate = (req, res, next) => {
    const { access_token } = req.headers

    console.log(req.headers.id);
    console.log(req.baseUrl.split('/')[1]);
    
    try {
        const userData = verifyToken(access_token)

        const user = User.findOne({ where: { username: userData.username } })
        if(user) {
            req.userData = userData

            next()
        } else {
            throw { code: 401, msg: `You either are not logged in or don't have proper access token.` }
        }
    } catch (err) {
        return next(err)
    }
}

const authorize = async (req, res, next) => {
    let baseRoute = req.baseUrl.split('/')[1]
    let data = null

    console.log(req.userData);
    
    try {
        switch(baseRoute){
            case 'todos':
                data = await Todo.findByPk(req.headers.id)
            break
            default:
                throw { code: 500, msg: `Missing route: ${baseRoute}` }
            break
        }

        if(data.UserId == req.userData.id) next()
        else throw { code: 403, msg: `You're not authorized to access this area.`}
    } catch (e) {
        return next(e)
    }
}

module.exports = {
    authenticate,
    authorize,
}