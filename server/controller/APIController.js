const { Todo } = require('../models');
//=====================================================
var SerpWow = require('google-search-results-serpwow');
// create the serpwow object, passing in our API key
let serpwow = new SerpWow(process.env.API_KEY);



class apiController {
    static getData(req, res, next) {
        let params = {
            q: req.params.input,
            num: 3
        };
        serpwow.json(params)
            .then(result => {
                let output = [];
                result.organic_results.forEach(element => {
                    let obj = {
                        Title: element.title,
                        snippet: element.snippet,
                        link: element.link
                    }
                    output.push(obj)
                });
                res.status(200).json({ data: output });
            })
            .catch(err => {
                return next(err)
            });
    }

    static findRelatedArticles(req, res, next) {
        let title;
        let params = {
            num: 3
        };
        let { id } = req.params
        Todo.findByPk(id)
            .then(data => {
                params.q = data.title;
                return serpwow.json(params)
            })
            .then(result => {
                let output = [];
                result.organic_results.forEach(element => {
                    let obj = {
                        Title: element.title,
                        snippet: element.snippet,
                        link: element.link
                    }
                    output.push(obj)
                });
                res.status(200).json({ data: output });
            })
            .catch(err => {
                return next(err)
            });
    }
}




module.exports = apiController