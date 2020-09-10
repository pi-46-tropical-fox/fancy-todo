const auth = require('express').Router()
const ApiQuoteController = require('../../controllers/ApiQuoteController')
const ApiWallpaperController = require('../../controllers/ApiWallpaperController')

auth
.get('/quote', ApiQuoteController.getRandom)
.get('/wallpaper', ApiWallpaperController.getWallpaper)

module.exports = auth