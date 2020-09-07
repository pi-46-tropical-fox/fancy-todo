'use strict'

const axios = require('axios').default;

class WeatherController {
  static async getWeather (req, res) {
    try {
      const response = await axios.get(`httxp://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_ACCESS_KEY}&query=San Fransisco`)
      console.log(response.data);
      res.status(200).json(response.data)
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

module.exports = WeatherController