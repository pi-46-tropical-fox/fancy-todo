const axios = require('axios')

const getWeather = (lat, long) => {
    let url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_APIKEY}&query=${lat},${long}`
    console.log(url);
    return axios({
        method: 'get',
        url: url
    }).then(response => {
        if (response.data.error) {
            throw response.data
        }
        console.log(response.data);
        const weatherDesc = response.data.current.weather_descriptions[0]
        const temp = response.data.current.temperature
        const obsTime = response.data.current.observation_time
        const location = response.data.location.name
        return `The current weather in ${location} is ${weatherDesc.toLowerCase()} with temperature of ${temp}. Observed at ${obsTime}`
    }).catch(err => {
        return err
    })
}

module.exports = {getWeather}