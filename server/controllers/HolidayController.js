const axios = require('axios');

class HolidayController {
	static list(req, res, next) {
		axios({
			method: 'get',
			url: 'https://public-holiday.p.rapidapi.com/2020/ID',
			headers: {
				'x-rapidapi-host': 'public-holiday.p.rapidapi.com',
				'x-rapidapi-key': process.env.RAPID_API_KEY,
			},
		})
			.then(response => res.status(200).json(response.data))
			.catch(error => next({ name: 'invalidHeaderRapidAPI' }));
	}
}

module.exports = HolidayController;
