const axios =require('axios').default

class Controller{
    static async weather (req,res){

        try {
            const response = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.WEATHER}&query=Jakarta`)
            res.status(200).json(response.data)
            console.log(response.data)
          } catch (error) {
            res.status(400).json(error)
            }
    }
}

module.exports = Controller