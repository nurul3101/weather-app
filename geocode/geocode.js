const request = require('request');

// 0c87b10d7fca4cd21b28479e119943af

var geocodeAddress = (Address, callback) =>{

    var encodedAddress = encodeURIComponent(Address);
    request({
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json:true
    },(error,response,body) =>{
        if(error){
            callback("Unable to connect to Google Servers.");
        }else if (body.status==='ZERO_RESULTS') {
            callback('Unable to find that address');
        }else if (body.status === 'OK'){
            callback(undefined , {
                address : body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude:body.results[0].geometry.location.lng
            });
        // console.log(`Address:${body.results[0].formatted_address}`);
        // console.log(`Latitude:${body.results[0].geometry.location.lat}`)
        // console.log(`Longitude:${body.results[0].geometry.location.lng}`)
        }
    });  
}

module.exports = {
    geocodeAddress
}

