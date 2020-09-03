const axios = require('axios');

class CalendarController {

    static publicHoliday2020 (req, res, next) {

        axios ({
            method: 'get',
            url: 'https://date.nager.at/Api/v1/Get/ID/2020',
        })

        .then (response => {
            let holidays = []
            
            response.data.forEach(el => {
                holidays.push (el.date)
                holidays.push (el.localName)
            })

            console.log (holidays)
            
            return res.status (200).json ({message : "Success, Displaying Public Holidays"})
        })

        .catch (err => {
            next (err)
        })
    }

    static publicHoliday2021 (req, res, next) {

        axios ({
            method: 'get',
            url: 'https://date.nager.at/Api/v1/Get/ID/2021',
        })

        .then (response => {
            let holidays = []
            
            response.data.forEach(el => {
                holidays.push (el.date)
                holidays.push (el.localName)
            })

            console.log (holidays)
            
            return res.status (200).json ({message : "Success, Displaying Public Holidays"})
        })

        .catch (err => {
            next (err)
        })
    }

    static publicHoliday2022 (req, res, next) {

        axios ({
            method: 'get',
            url: 'https://date.nager.at/Api/v1/Get/ID/2022',
        })

        .then (response => {
            let holidays = []
            
            response.data.forEach(el => {
                holidays.push (el.date)
                holidays.push (el.localName)
            })

            console.log (holidays)
            
            return res.status (200).json ({message : "Success, Displaying Public Holidays"})
        })

        .catch (err => {
            next (err)
        })
    }

    static longWeekend2020 (req, res, next) {
        axios ({
            method: 'get',
            url: 'https://date.nager.at/Api/v2/LongWeekend/2020/ID',
        })

        .then (response => {
            console.log (response.data)
            return res.status (200).json ({message : "Success, Displaying Long Weekends 2020"})
        })

        .catch (err => {
            next (err)
        })

    }

    static longWeekend2021 (req, res, next) {
        axios ({
            method: 'get',
            url: 'https://date.nager.at/Api/v2/LongWeekend/2021/ID',
        })

        .then (response => {
            console.log (response.data)
            return res.status (200).json ({message : "Success, Displaying Long Weekends 2021"})
        })

        .catch (err => {
            next (err)
        })

    }

    static longWeekend2022 (req, res, next) {
        axios ({
            method: 'get',
            url: 'https://date.nager.at/Api/v2/LongWeekend/2022/ID',
        })

        .then (response => {
            console.log (response.data)
            return res.status (200).json ({message : "Success, Displaying Long Weekends 2022"})
        })

        .catch (err => {
            next (err)
        })

    }

    

}

module.exports = CalendarController