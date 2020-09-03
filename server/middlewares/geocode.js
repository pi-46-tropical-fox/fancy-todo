const axios = require('axios')
const getCoordinates = async (location) => {
    try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1Ijoicm9jdHJhbXdheGVkIiwiYSI6ImNrOXo3N3R4ODA4NXQzbnFpdjkxY3F1b24ifQ.5ucZ9SoXEXwVLoLGgkiFsQ`
        const response = await axios.get(url)
        
        if (!response.data.features[0]) {
            throw {message: 'location not found', statusCode: 404}
        }

        return response.data
    } catch (err) {
        return err
    }
}

module.exports = {
    getCoordinates
}