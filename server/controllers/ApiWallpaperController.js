const axios = require('axios')

class ApiWallpaperController{
    static async getWallpaper(req, res, next){
        try {
            let result = await axios({
                method: "GET",
                url: "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US"
            })
            
            let { data } = result

            let url = `https://bing.com${data.images[0].url}`

            res.status(200).send({url})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ApiWallpaperController