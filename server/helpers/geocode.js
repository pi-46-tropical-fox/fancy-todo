const axios = require('axios')
const getCoordinates = async (location) => {
    try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${process.env.MAPBOX_APIKEY}`
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