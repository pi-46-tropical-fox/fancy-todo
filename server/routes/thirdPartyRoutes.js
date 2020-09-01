const ThirdPartyController = require("../controllers/ThirdPartyController");
const router = require("express").Router();

router.get("/weather", ThirdPartyController.getWeather);

module.exports = router;