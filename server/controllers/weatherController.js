const axios = require('axios')

class weatherController {
    static async showAll(req,res) {
        try {
          const response = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.ACCESS_KEY}&query=Bogor`);
        
          res.status(200).json(response.data)
        } catch (error) {
        
          res.status(500).json({message: `Internal server error`})
        }
      }    
}

module.exports = weatherController
