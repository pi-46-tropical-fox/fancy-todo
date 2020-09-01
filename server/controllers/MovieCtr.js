const axios = require(`axios`)

class Controller{
    static list(req, res, next){
        const url = `http://www.omdbapi.com/?apikey=${process.env.APIEY}&s=avengers`
        axios({
            method: "get",
            url,
        })
        .then(response => {
            res.status(200).json({
                data: response.data
            })
        })
        .catch(next)
    }
}

module.exports = Controller

