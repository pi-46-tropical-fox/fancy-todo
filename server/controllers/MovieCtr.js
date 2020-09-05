const axios = require(`axios`)

class Controller{
    static list(req, res, next){
        const url = `http://www.omdbapi.com/`
        axios({
            method: "get",
            url,
            params: {
                apikey: process.env.APIKEY,
                s: "avengers"
            }
        })
        .then(response => {
            console.log(response)
            res.status(200).json({
                data: response.data
            })
        })
        .catch(next)
    }
}

module.exports = Controller

