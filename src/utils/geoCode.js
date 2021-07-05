const request = require('request')

const geoCode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicHJpeWFua3BhdGVsMTAwMTE5OTkiLCJhIjoiY2txbGd2dTE1MGl3aTJ2bjRyYnd1c245ayJ9.Nb0aERfg6Pg22_JLoL4z7g`

    request({url:url,json:true},(error,response) =>{

        error 
        ? callback('Please Check Internet Connectivity',undefined) 
        : (response.body.features.length === 0) 
        ? callback(`Unable to find location. Please check location entered.`,undefined) 
        : callback(undefined,[response.body.features[0].center[1], response.body.features[0].center[0],response.body.features[0].place_name]); 


    })
}

module.exports = geoCode