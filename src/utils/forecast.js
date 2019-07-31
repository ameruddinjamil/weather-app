const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/69af797326587de255fe853c48c1f012/${latitude},${longitude}`;

    request({ url: url, json: true }, (err, resp) => {
        if (err) {
            callback('Error reaching to service', undefined);
        } else if (resp.body.error) {
            callback(resp.body.error, undefined);
        } else {
            const temperature = resp.body.currently.temperature;
            const probability = resp.body.currently.precipProbability;

            callback(undefined, {
                temperature: temperature,
                rainProbability: probability
            })
        }
    })
}

module.exports = forecast;