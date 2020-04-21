let router = require('express').Router()
let db = require('../models')

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN})

router.get('/', (req, res) => {
    geocodingClient.forwardGeocode({
        query: `${req.query.city}, ${req.query.state}`
    })
    .send()
    .then(response => {
        let match = response.body.features[0]
        // res.send(response.body)
        res.render('show', { match, mapkey: process.env.MAPBOX_TOKEN })
    })
    .catch(err => {
        console.log(err)
        res.send(`You've encountered an error.`)
    })
})

router.post('/fave', (req, res) => {
    db.place.create(req.body)
    .then(response => {
        res.send(response)
    })
})

module.exports = router