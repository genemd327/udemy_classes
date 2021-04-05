const request = require('request')

const forecast = (latitude, longitude, callback) => {
    // Example: 'http://api.weatherstack.com/current?access_key=9c6d5cf21afe6a13645f4d8bc8eb9df2&query=37.8267,-122.4233&units=f'
    const url = 'http://api.weatherstack.com/current?access_key=9c6d5cf21afe6a13645f4d8bc8eb9df2&query='+latitude+','+longitude+'&units=f'

    request({url, json:true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find the weather for that location. Try another search.', undefined)
        } else { 
            callback(undefined, { 
                temperature : body.current.temperature,
                feelslike : body.current.feelslike,
                description : body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast