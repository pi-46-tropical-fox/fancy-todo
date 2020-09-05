const axios = require('axios').default;

const tmdbUrl = 'https://api.themoviedb.org/3';
const api_key = process.env.TMDB_API_KEY;

class MovieController {
	static async searchMovieByKeyword(req, res, next) {
		try {
			const { q } = req.query

			const searchResult = await axios.get(`${tmdbUrl}/search/movie`, {
				params : {
					api_key,
					query : q,
					limit : 5
				}
			})
	
			res.status(200).json(searchResult.data)
		} catch(err){
			next(err)
		}
	}

}

module.exports = MovieController;
