const axios = require('axios')
// const { noExtendLeft } = require('sequelize/types/lib/operators')

class WeatherController {

    static current(req, res, next) {
        const url = `http://api.weatherstack.com/current?access_key=5c979f6e343790a4e4350edf1110489e&query=Jakarta`
        axios({
            method:'get',
            url:url
        })
        .then(response => {
            console.log(response.data)
            res.status(200).json({msg: 'berhasil current weather'})
        })
        .catch( err => next(err))
    }

}

module.exports = WeatherController