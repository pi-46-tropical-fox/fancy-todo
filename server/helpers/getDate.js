function getDate(date) {
    let newDate = date.toISOString().split('T')
    return newDate[0]
}

module.exports = getDate