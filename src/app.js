const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000
//test
//Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kohl Byrd'
    })
})

app.get ('/about', (req, res) => {
    res.render('about', {
            title: 'About Me',
            name: 'Kohl Byrd'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Kohl Byrd',
        message: 'This is a help message'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({error})
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
    
            console.log(location)
            console.log(forecastData)

            res.send({
                address: req.query.address,
                forcast: forecastData[0],
                temp: forecastData[1]
            })
        })
    })  
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*' ,(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kohl Byrd',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kohl Byrd',
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port' + port)
})