const request= require('request')
const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?types=address&access_token=pk.eyJ1IjoiaGltYW5zaHU5MzM0MCIsImEiOiJja3F4aHlqdHQwOWVxMnFwNm95cmpsemh4In0.OkFJAMDqTK2aX8C60MAVtQ'
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('unable to connect to location services',undefined)
        }
        else if(body.features && body.features.length === 0){
            callback('unable to find location. try another search', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports= geoCode
