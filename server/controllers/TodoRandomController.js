const axios = require('axios');

class TodoRandomController {
    static async randomActivity (req,res,next) {
        const response = await axios({
            method: 'get',
            url: process.env.RANDOM_ACTIVITIES,
          });
        try {
            res.status(200).json({result: response.data});
        } catch(err) {
            // err.name = err.response.data.code
            // err.msg = err.response.data.msg
            return next (err)
        }
    }

}

module.exports = TodoRandomController