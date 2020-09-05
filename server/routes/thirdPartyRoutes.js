const ThirdPartyController = require("../controllers/ThirdPartyController");
const router = require("express").Router();

router.get("/weather", ThirdPartyController.getWeather);
router.get("/quotes", ThirdPartyController.getQuotes);

module.exports = router;