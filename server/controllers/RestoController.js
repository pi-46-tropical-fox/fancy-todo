const axios = require('axios')

class RestoController {
    static recomendation(req,res,next){
        // res.send('masuk')
        let url = 'https://developers.zomato.com/api/v2.1/collections?city_id=74&lat=%09-6.200000&lon=%09106.816666&count=10'
        console.log(req.headers.user_key, '<<<< user key')
        axios({
            method: 'get',
            url: url,
            headers:{
                user_key: req.headers.user_key
            }
        })
        // axios.get(url)
        .then(response => {
            console.log(response)
            res.status(200).json(response.data.collections)
        })
        .catch(err => {
            console.log(err)
            res.send('gagal')
        })
    }
}

module.exports = RestoController