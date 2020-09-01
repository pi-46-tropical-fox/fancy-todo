const axios = require("axios");

class ThirdPartyController {
  
  static async getWeather(req, res, next) {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.wSAccess}&query=Denpasar`;
    try {
      const weather = await axios.get(url);
      return res.status(200).json(weather.data);
    } catch (err) {
      console.log("<<<< error in getWeather ThirdPartyController");
      return next(err);
    }
  }

}

module.exports = ThirdPartyController;