const axios = require('axios')
// const { noExtendLeft } = require('sequelize/types/lib/operators')

class WeatherController {

    static current(req, res, next) {
        const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERAPIKEY}&query=Jakarta`
        axios({
            method:'get',
            url:url
        })
        .then(response => {
            const data = response.data
            console.log(response.data)
            res.status(200).json({data})
        })
        .catch( err => next(err))
    }

}

// console.log( WeatherController.current(req, res, next))

module.exports = WeatherController