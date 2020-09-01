const axios = require('axios').default;

class GithubController{
    static url = 'https://api.github.com';

    static async getUser(req, res){
        let data = await axios.get(`${url}/users/${req.params.username}`)
        res.status(200).json(data)
    }
}

module.exports = GithubController;