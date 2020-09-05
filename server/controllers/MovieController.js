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
            let response = await axios.get(`${tmdbUrl}/search/movie`, {
                params
            })
    
            res.status(200).json(response.data.results)
        } catch (err){
            next(err)
        }
    }
}

module.exports = MovieController;