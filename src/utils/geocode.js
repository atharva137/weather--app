const request = require('postman-request');


const geocode = (adress, callback) =>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1IjoiYXRoYXJ2YTEzNzEiLCJhIjoiY2tweWdpd3g5MDh1YzJvcGsyb2Y3cTAwayJ9.YrvNDBT3CMBkiX1bANPcOw&limit=1'
    
    request({url:url, json: true},(error, response)=>{
      if(error){
        callback('unable to connect location services',undefined);
      }else if(response.body.features.length===0){
        callback('unable to find location , Try another search',undefined);
      }else{
        
         callback(undefined,
            {
                latitude : response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                places : response.body.features[0].place_name , 
            }
          )
      }
    })
    
    }

   module.exports = geocode;