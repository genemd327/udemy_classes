const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup statis directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Mean'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mean'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Application Help',
        helpText: 'There is no help! Good luck!',
        name: 'Mean'
    })
})

app.get('/weather', (req, res) => {
    // console.log(req.query)
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {  
        if (error) {
            console.log(error)
            return res.send(error)
        }
        forecast(latitude, longitude, (forecastError, {temperature, feelslike, description} = {}) => {
            if (forecastError) {
                console.log(forecastError)
                return res.send(forecastError)

            }
            console.log(location)
            console.log(temperature, feelslike, description)

            res.send({
                address : location,
                forecast : description
            })

        })
    })
    // res.send({
    //     address : req.query.address,
    //     forecast : 'windy'
    // })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('pageerrors', {
        title: 'Application Help',
        errorMessage : 'Help article not found.', 
        name: 'Mean'
    })
})


app.get('*', (req, res) => {
    res.render('pageerrors', {
        title: '404',
        errorMessage : 'Page not found.',
        name: 'Mean'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

