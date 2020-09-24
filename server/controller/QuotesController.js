const { default: Axios } = require("axios");
const axios = require("axios");
const { response } = require("express");
require('dotenv').config()
const API_KEY= process.env.Dokumen_Negara

class QuoteController {
    static getQuote(req, res, next){
        let api = axios({
            "method":"GET",
            "url":"https://andruxnet-random-famous-quotes.p.rapidapi.com/",
            "headers":{
            "content-type":"application/octet-stream",
            "x-rapidapi-host":"andruxnet-random-famous-quotes.p.rapidapi.com",
            "x-rapidapi-key":`${API_KEY}`,
            "useQueryString":true
            },"params":{
            "cat":"famous",
            "count":"0"
            }
            })
            
            .then(response=>{
                const datas = response.data
                console.log(datas);
                res.status(201).json(datas)

            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = QuoteController;