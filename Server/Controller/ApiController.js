const axios = require('axios');

class ApiController {
    static getNews(req, res, next) {
        const url = `http://newsapi.org/v2/everything?q=apple&from=2020-09-04&to=2020-09-04&sortBy=popularity&apiKey=${process.env.API_KEY}`

        axios({
            method: 'GET',
            url: url
        })
            .then(response => {
                console.log(response.data)
                let result = []
                
                for(let i = 0; i < 3; i++) {
                    result.push(response.data.articles[i])
                }
                console.log(result)
                return res.status(200).json({result})
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({message: 'bad request!'})
            })
    }
}

module.exports = ApiController