const axios = require('axios')

class weatherController {
    static async showAll(req,res) {
        try {
          const city = req.query.query

          const response = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.ACCESS_KEY}&query=${city}`);
          // res.send(response.data)
          res.status(200).json(response.data)
        } catch (error) {
          // res.send(error)
          res.status(500).json({message: `Internal server error`})
        }
      }    
}

module.exports = weatherController
