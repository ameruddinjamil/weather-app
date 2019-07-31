const request = require('request');

const geocode = (address, callback) => {
    const encodedUri = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedUri}.json?access_token=pk.eyJ1IjoiYW1lcnVkZGluamFtaWwiLCJhIjoiY2p5bzRlNTM0MTB4ZDNtczhpeGpibnJkdCJ9.9zc9E2LR6idadA5WxJGxIQ&limit=1`

    request({ url: url, json: true }, (err, resp) => {
        if (err) {
            callback('Error reaching service', undefined)
        } else if (resp.body.features.length === 0) {
            callback('No location found', undefined)
        } else {
            const longitude = resp.body.features[0].center[0];
            const latitude = resp.body.features[0].center[1];
            const location = resp.body.features[0].place_name;

            callback(undefined, {
                longitude: longitude,
                latitude: latitude,
                location: location
            });
        }
    });
}

module.exports = geocode;