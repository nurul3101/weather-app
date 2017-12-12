const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a:{
            demand:true,
            alias:'address',
            describe:'Address to Fetch weather for',
            string:true
        }
    })
    .help()
    .alias('help','h')  
    .argv;

var encodedAddress = encodeURIComponent(argv.a);    
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;



axios.get(geocodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that Address');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/0c87b10d7fca4cd21b28479e119943af/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`Its currently ${temperature}.It feels like ${apparentTemperature}.`)
}).catch((e)=> {
    if(e.code ==='ENOTFOUND'){
        console.log('Unable to connect to API Servers.')
    }else{
        console.log(e.message);
    }
    
}); 






   