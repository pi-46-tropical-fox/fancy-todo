const router = require('express').Router()
const QuotesController = require('../controllers/quotesController')


router.get('/quotes', QuotesController.getQuote)

module.exports = router