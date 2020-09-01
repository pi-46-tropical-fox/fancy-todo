const HolidayController = require('../controllers/HolidayController');

const routes = require('express').Router();

routes.get('/holidays', HolidayController.list);

module.exports = routes;
