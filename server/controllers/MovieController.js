const axios = require('axios')

class Controller {
    static async getTrending(req, res) {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
                params : {
                    api_key: process.env.API_KEY,
                    languange: 'en-US',
                    page: 1
                }
            })

            res.status(200).json(response.data.results)
        } catch(err) {
            res.status(500).json('Interval Server Error')
        }
    }
}

module.exports = Controller