const axios = require('axios')
const id = Math.floor(Math.random()*500)

//console.log(id);
class Information{
    static async getInfo(req, res){
        try{
            const respond = await axios.get(`https://superheroapi.com/api/3418170631555015/${id}/biography`)
            console.log(respond.data, 'ini data');
            res.status(200).json(respond)
        }
        catch(err){
           // console.log(err, 'ini error');
            res.status(400).json(err)
        }
    }
}

module.exports = Information