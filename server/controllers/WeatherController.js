const axios = require('axios')

class getWeather {
    static (req, res, next) {
        // const api_url = 
        axios({
            method: 'GET',
            url: `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=Jakarta`
        })
        .then(res => {
            console.log('ini weather');
            res.status(200).json({result: res.data})
        })
        .catch(err => {
            return next(err)
        })
    }
}

module.exports = getWeather