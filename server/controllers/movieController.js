const axios = require('axios')

class MovieController {
    static showMovie(req, res) {
        let data1;
        axios({
            "method":"GET",
            "url":"https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/the%2520pursuit%2520of%2520happyness",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"imdb-internet-movie-database-unofficial.p.rapidapi.com",
            "x-rapidapi-key": process.env.MOVIE_API_KEY,
            "useQueryString":true
            }
        })
            .then((response)=>{
                data1 = response.data
                // return res.status(200).json(response.data)
                return axios({
                    "method":"GET",
                    "url":"https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/fast%2520and%2520furious",
                    "headers":{
                    "content-type":"application/octet-stream",
                    "x-rapidapi-host":"imdb-internet-movie-database-unofficial.p.rapidapi.com",
                    "x-rapidapi-key": process.env.MOVIE_API_KEY,
                    "useQueryString":true
                    }
                })
            })
            .then((response)=>{
                return res.status(200).json([data1, response.data])
            })
            .catch((error)=>{
              console.log(error)
            })
    }
}

module.exports = MovieController