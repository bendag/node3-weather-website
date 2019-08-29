const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a7aa7bbef0f4e675c282c3f0bfa180c8/' + latitude + ',' + longitude + '?units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const req = body.currently
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + req.temperature + ' degrees out.' +
                'There is a ' + req.precipProbability + '% chance of rain. The maximum for today is ' + body.daily.data[0].temperatureHigh +
                '. The minimum for today is ' + body.daily.data[0].temperatureLow + '.')
        }
    })
}

module.exports = forecast