const axios = require('axios').default

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET

const qs = require('querystring')

const spotifyApiUrl = 'https://api.spotify.com/v1'


class MusicController{
    static async getSpotifyAccessToken(){
        const res = await axios.post('https://accounts.spotify.com/api/token', 
            qs.stringify({ 'grant_type' : 'client_credentials' }), { 
            headers : {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth : {
                username : spotifyClientId,
                password : spotifyClientSecret
            }
        })

        return res.data.access_token
    }

    // Endpoint untuk cari track berdasarkan keyword
    static async searchMusicByKeyword(req, res, next){
        try{
            const accessToken = await MusicController.getSpotifyAccessToken()

            const keyword = req.query.q
            const url = `${spotifyApiUrl}/search`
    
            const searchResult = await axios.get(url, {
                params : {
                    query : keyword,
                    type : 'track',
                    market : 'ID',
                    limit : 5
                },
                headers : {
                    'Authorization' : `Bearer ${accessToken}`
                }
            })
            
            res.status(200).json(searchResult.data)
        } catch(err){
            next(err)
        }       
    }

}

module.exports = MusicController
