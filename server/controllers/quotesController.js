const axios = require('axios')

class QuotesController {
    static getQuote (req, res, next) {
        const url = 'https://quote-garden.herokuapp.com/api/v2/quotes/random'

        axios({
            method:'GET',
            url: url
        })
            .then(response => {
                console.log(response.data)
                return res.status(200).json(response.data.quote)
            })
            .catch(err => {
                return next(err)
            })

    }
}

module.exports = QuotesController