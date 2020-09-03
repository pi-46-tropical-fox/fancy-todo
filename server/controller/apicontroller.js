const axios = require('axios')

class LocationController {
    static getCoordinates (location) {
        location = 'jatiwaringin'
        const url = `api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoicm9jdHJhbXdheGVkIiwiYSI6ImNrOXo3N3R4ODA4NXQzbnFpdjkxY3F1b24ifQ.5ucZ9SoXEXwVLoLGgkiFsQ`
        axios({
            method: 'get',
            url: url
        }).then(response => {
            console.log(response.data);
        })
    }
}

class WeatherController {

}

module.exports = {
    LocationController,
    WeatherController
}