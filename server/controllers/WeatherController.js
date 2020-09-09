const axios = require('axios')

class WeatherController {
    static async show (req,res,next) {
        try {
          const response = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.WEATHER}&query=Jakarta`)
          return res.status(200).json(response.data)
        } catch (error) {
          return next(error)
          }
        }
}


module.exports = WeatherController