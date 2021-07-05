const request = require('request')

const forecast = (lat,lng,callback) =>{

    const url = `http://api.weatherstack.com/current?access_key=5281d1d3ffd2016da758df43e36ad267&query=${lat},${lng}`

    request({url:url,json:true},(error,response) => {
        error 
        ? callback('Please Check Internet Connectivity',undefined) 
        : (response.body.error) 
        ? callback(response.body.error.info,undefined) 
        : callback(undefined,`${response.body.current.weather_descriptions}. It is currently ${response.body.current.temperature} degrees outside. There is a ${response.body.current.precip} chance of rain` );
    })

}

module.exports = forecast