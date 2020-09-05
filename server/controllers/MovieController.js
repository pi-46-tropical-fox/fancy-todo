const axios = require('axios').default;

const tmdbUrl = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

class MovieController{
    static async searchMovieByKeyword(req, res, next){
        let params = new URLSearchParams();

        let { q } = req.query;

        params.append('api_key', TMDB_API_KEY)
        params.append('query', q)
        
        try{
            const response = await axios.get(`${tmdbUrl}/search/movie`, {
                params
            })

            let results = response.data.results

            results = results.map(e => {
                if(e.poster_path){
                    e.poster_path = 'https://image.tmdb.org/t/p/w200/' + e.poster_path
                }

                e.infoUrl = 'https://www.themoviedb.org/movie/' + e.id

                return e
            })
    
            res.status(200).json(results)
        } catch (err){
            next(err)
        }
    }
}

module.exports = MovieController;