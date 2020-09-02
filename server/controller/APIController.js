const axios = require("axios")
const { Todo } = require('../models')
class apiController {
    static getData(req, res, next) {
        let params = req.params.input.split(' ')
        const url = `http://newsapi.org/v2/everything?q=${params[params.length-1]}&from=2020-08-01&sortBy=popularity&apiKey=${process.env.API_KEY}`
        axios({
                method: 'GET',
                url: url
            })
            .then((response) => {
                let result = [];
                if (response.data.articles.length) {
                    for (let i = 0; i < 3; i++) {
                        let obj = {
                            Title: response.data.articles[i].title,
                            url: response.data.articles[i].url
                        }
                        result.push(obj)
                    }
                    res.status(200).json({ result: result })
                } else {
                    throw { message: "Articles not found", statusCode: 404 }
                }
            })
            .catch(err => {
                return next(err)
            })
    }

    static findRelatedArticles(req, res, next) {
        let title;
        let { id } = req.params
        Todo.findByPk(id)
            .then(data => {
                title = data.title;
                let query = data.title.split(' ');
                let params = query[query.length - 1]
                const url = `http://newsapi.org/v2/everything?q=${params}&from=2020-08-01&sortBy=publishedAt&apiKey=${process.env.API_KEY}`
                return axios({
                    method: 'GET',
                    url: url
                })
            })
            .then((response) => {
                let result = [{ Title: title }];
                if (response.data.articles.length) {
                    for (let i = 0; i < 3; i++) {
                        let obj = {
                            Title: response.data.articles[i].title,
                            url: response.data.articles[i].url
                        }
                        result.push(obj)
                    }
                    res.status(200).json({ result: result })
                } else {
                    throw { message: "Articles not found", statusCode: 404 }
                }
            })
            .catch(err => {
                return next(err)
            })
    }
}




module.exports = apiController