const settings = require('../config/settings')

module.exports = {
    getSettings: (settingsKeys) => {
        let data = {}
        
        settingsKeys.forEach(key => {
            data[key] = settings[key]
        })

        return data
    },
    setSettings: (settingsKeys, obj) => {
        // must be an object, or this will happen...
        if(Array.isArray(obj)) return "Included settings must not be an array!"

        let data = getSettings(settingsKeys)

        return {...data, ...obj}
    }
}