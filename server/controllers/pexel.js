const axios = require('axios').default;

class PexelController {
  static getPexel (req, res, next) {
    axios({
      method:"GET",
      url : "http://api.pexels.com/v1/search?query=example+query&per_page=15&page=1",
      headers: {
      'Authorization': '563492ad6f917000010000014eb73d02e9134f9d8f70fa9d5b0c39cc'
      } 
    })
    .then((response)=>{
      console.log(response.data,'ini respon')
      res.status(200).json({data:response.data})
    })
    .catch(err => next(err))
  }
}
    // axios({
    //   method:"GET",
    //   url:"https://free-football-soccer-videos1.p.rapidapi.com/v1/",
    //   headers:{
    //   "content-type":"application/octet-stream",
    //   "x-rapidapi-host":"free-football-soccer-videos1.p.rapidapi.com",
    //   "x-rapidapi-key":"282b93a72emsh4e73ee5789244b8p1a468djsna09112b9a3c2",
    //   "useQueryString":true
    //   }
    //   })
    //   .then((response)=>{
    //     console.log(response.data)
    //     res.status(200).json({res})
    //   })
    //   .catch(err => next(err))
  // }
// }

module.exports = PexelController
 
// }

// request(data, function(error,response, body){
// if(!error && response.statusCode == 200){
//      console.log(body);
//  }
// });


// const axios = require('axios')

// class SportsController {
//     static getSport(req, res, next){
//         axios({
//             method:"GET",
//             url:"https://free-football-soccer-videos1.p.rapidapi.com/v1/",
//             headers:{
//             "content-type":"application/octet-stream",
//             "x-rapidapi-host":"free-football-soccer-videos1.p.rapidapi.com",
//             "x-rapidapi-key":"282b93a72emsh4e73ee5789244b8p1a468djsna09112b9a3c2",
//             "useQueryString":true
//             }
//             })
//             .then((response)=>{
//               console.log(response.data)
//               res.status(200).json({res})
//             })
//             .catch(err => next(err))
//     }
// }

// module.exports = SportsController;
// const axios = require('axios').default;

// class WeatherController {
//   static async getWeather (req,res) {
//     try {
//       const response = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_ACCESS_KEY}&query=Jakarta`)
//       res.status(200).json(response.data)
//     } catch (error) {
//       res.status(400).json(error)
//       }
//     }
// }

// module.exports = WeatherController