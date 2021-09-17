const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d583db3d0bf9784242ef56ff566e718f&query=' + lat +','+ long + '&units=f'
    request({url, json: true}, (error, { body }) => {
       if(error) {
           callback('ERROR',undefined)
       } else if (body.error) {
            callback('UNABLE TO FIND LOCATION (forecast.js)', error)
       } else {
            callback(undefined, [body.current.weather_descriptions[0], body.current.temperature])
       }
    })
} 
//THIS IS A TEST
module.exports = forecast;