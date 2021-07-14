const request= require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=0987e69a5f7e9919f8e2766776483234&query=' + latitude + ',' +longitude
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,'It is currently ' +' '+ body.current.temperature +' '+ ' feels like '+' '+body.current.feelslike+'.')
        }
    })
}
module.exports=forecast






