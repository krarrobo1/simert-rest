const express = require('express');
const ParkingSpot = require('../models/parkingSpot');

let parkingRoute = express.Router();

parkingRoute.get('/spots', (req, res) => {
    ParkingSpot.find({}, (err, collection) => {
        if (err) return res.status(500).json({ ok: false, err });
        const featureCollection = {
            type: 'FeatureCollection',
            features: collection
        }
        res.status(200).json({ ok: true, featureCollection })
    })
});

parkingRoute.put('/spot/:id', (req, res) => {
    const id = req.params.id;
    const state = Boolean(req.body.state);
    ParkingSpot.findById(id, (err, spot) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!spot) return res.status(400).json({ ok: false, err: { message: "parking spot not found!" } });
        spot.properties.state = state;
        spot.save();
        return res.status(200).json({ ok: true, spot });
    });
});
module.exports = parkingRoute;