const request = require('request')

// const weatherURL = 'http://api.weatherstack.com/current?access_key=9c6d5cf21afe6a13645f4d8bc8eb9df2&query=37.8267,-122.4233&units=f'

// request({url: weatherURL, jmodule.exports = geocodeson:true}, (error, weatherResponse) => {
//     if (error) {
//         console.log('Error when trying to communicate with weather service.')
//     } else if (weatherResponse.body.error) {
//         console.log('Error from WeatherStack: '+weatherResponse.body.info+" . Unable to find the location!")
//     } else {
//         console.log(chalk.white.bold(weatherResponse.body.current.weather_descriptions[0])+": The curent temperature is "+chalk.blue(weatherResponse.body.current.temperature)+". It feels like "+chalk.white(weatherResponse.body.current.temperature)+".")
//     }
// })

// Geocoding
// Address -> Lat/Long -> Weatherrequire('./utils/geocode')

// const mapBoxURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angelos%20County%20Muesum%2C%20Wilshire%20Blvd%2C%20Los%20Angeles%2C%20California%2090036%2C%20United%20States.json?access_token=pk.eyJ1IjoiZzNuMzc3NyIsImEiOiJja214Z2Zxdmkwb2o1MnBxaTlrcW1mOTg4In0.n4_Y-j9l2aAKQ5APZqup0g'

// request({url: mapBoxURL, json:true}, (error, mapResponse) => {
//     // console.log(mapResponse)

//     if (error) {
//         console.log('Error when trying to communicate with the mapping service.')
//     } else if (mapResponse.body.features === undefined) {
//         console.log('Unable to find the location!')
//     } else if (mapResponse.body.features.length === 0) {
//         console.log('Unable to find the location!')
//     } else {
//         const lat = mapResponse.body.features[0].center[1]
//         const lon = mapResponse.body.features[0].center[0]

//         console.log("Lat:"+lat+", Lon:"+lon)
//     }
//  })

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZzNuMzc3NyIsImEiOiJja214Z2Zxdmkwb2o1MnBxaTlrcW1mOTg4In0.n4_Y-j9l2aAKQ5APZqup0g'
    
    request({url: url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback({error:'Unable to connect to location services'}, undefined)
        //} else if (body.features.length === undefined) {
        //    callback('Unable to find location. Try another search.', undefined)
        } else if (body.features.length === 0) {
            callback({error:'Unable to find location. Try another search.'}, undefined)
        } else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
} 

module.exports = geocode
