const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, '../public');
const viewPaths = path.join(__dirname, '../templates/views');
const partialPaths = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewPaths);
hbs.registerPartials(partialPaths);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Amer'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Amer'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Amer',
        helptext: 'Tolala tolong saya'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'address parameter is required'
        })
    }

    const address = req.query.address;

    geocode(address, (err, resp) => {
        if (err) {
            return res.send({
                error: err
            });
        }
    
        // res.send({
        //     latitude: resp.latitude,
        //     longitude: resp.longitude,
        //     location: resp.location
        // })

        forecast(resp.longitude, resp.latitude, (err, forecastResp) => {
            if (err) {
                return res.send({
                    error: err
                })
            }

            res.send({
                location: resp.location,
                temperature: forecastResp.temperature
            })
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'search parameter is required'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Oppps',
        name: 'Amer',
        error: 'Help article not found'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Oppps',
        name: 'Amer',
        error: 'Page Not Found'
    })
});

app.listen(port, () => {
    console.log('Server is up on port', port)
});