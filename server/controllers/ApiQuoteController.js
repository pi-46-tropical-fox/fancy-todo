const axios = require('axios')

class ApiQuoteController{
    static async getRandom(req, res, next){
        try{
            const result = await axios({
                method: "GET",
                url: "https://programming-quotes-api.herokuapp.com/quotes/random"
            })

            let { data } = result

            res.status(200).send(data)
        }catch(err){
            next(err)
        }
    }
}

module.exports = ApiQuoteController