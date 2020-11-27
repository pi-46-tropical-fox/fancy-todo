const axios = require('axios').default;

const jikan = 'https://api.jikan.moe/v3';

class AnimeController {
	// Endpoint untuk cari anime berdasarkan keyword
	static async searchAnimeByKeyword(req, res) {
		const searchResult = await axios.get(`${jikan}/search/anime`, {
			params: {
				q: req.query.q,
			},
		});

		res.status(200).json(searchResult.data);
	}
}

module.exports = AnimeController;
