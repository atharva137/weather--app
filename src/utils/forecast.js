const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=f66fa64202ba3bb016f62df248b4ca4c&query=" +
    latitude +
    "," +
    longitude;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect", undefined);
    } else if (response.body.error) {
      callback("unalbe to find wheather location", undefined);
    } else {
      callback(
        undefined,

        response.body.current.weather_descriptions[0] +
          ". its currently " +
          response.body.current.temperature +
          " degree out and feels like " +
          response.body.current.feelslike
      );
    }
  });
};

module.exports = forecast;
