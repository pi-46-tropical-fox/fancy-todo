const { User } = require('../models');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static async register(req, res) {
        try {
            const result = await User.create(req.body);
            const access_token = generateToken({ id: result.id });

            res.json({ access_token });
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    }

    static async login(req, res) {

    }
}

module.exports = UserController;
