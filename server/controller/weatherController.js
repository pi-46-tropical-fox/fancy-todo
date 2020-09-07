const axios = require('axios').default;

class weatherController {
    static async getWeather (req,res) {
        try {
            console.log('in wetaher');
            const response = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_ACCESS_KEY}&query=Jakarta`)
            res.status(200).json(response.data)
        } catch (error) {
            console.log('in error');
            console.log(error);
            res.status(400).json(error)
         }
    }
}

module.exports = weatherController