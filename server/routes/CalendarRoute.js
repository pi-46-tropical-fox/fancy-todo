const router = require ("express").Router ()
const CalendarController = require ("../controllers/CalendarController.js")

router.get ("/holidays2020", CalendarController.publicHoliday2020)
router.get ("/holidays2021", CalendarController.publicHoliday2021)
router.get ("/holidays2022", CalendarController.publicHoliday2022)

router.get ("/longweekends2020", CalendarController.longWeekend2020)
router.get ("/longweekends2021", CalendarController.longWeekend2021)
router.get ("/longweekends2021", CalendarController.longWeekend2022)

module.exports = router