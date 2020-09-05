const axios = require('axios')

class FoodController {
    static getResto (req, res, next) {
        const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${req.query.location_id}&entity_type=city&q=${req.query.name}&count=10&sort=rating&order=asc`
        axios({
            method: 'GET',
            url,
            headers : {
                'user-key' : process.env.ZOMATOAPI_SECRET
            }
        })
        .then(response => {
        
            res.status(200).json(response.data.restaurants)
        })
        .catch(err => {
            next(err.response.data)    
        })
    }
}
 module.exports = FoodController