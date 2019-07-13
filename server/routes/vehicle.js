const express = require('express');
const Vehicle = require('../models/vehicle');
const { verifyToken } = require('../middleware/auth');
const vehicleRoute = express.Router();

vehicleRoute.post('/vehicle', verifyToken, (req, res) => {
    let body = req.body;
    let user = req.user._id;
    let newVehicle = new Vehicle({
        plate: body.plate,
        owner: user,
        description: { brand: body.brand, type: body.type, color: body.color }
    });
    newVehicle.save((err, vehicleDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        return res.status(200).json({ ok: true, vehicle: vehicleDB });
    })
});

vehicleRoute.get('/vehicle/:id', (req, res) => {
    const id = req.params.id;
    Vehicle.findById(id)
        .populate('owner', '_id, name , email')
        .exec((err, vehicleDB) => {
            if (err) return res.status(500).json({ ok: false, err });
            if (!vehicleDB) return res.status(400).json({ ok: false, err: { message: 'Vehicle not found !' } });
            return res.status(200).json({ ok: true, vehicle: vehicleDB });
        });
});

vehicleRoute.get('/vehicles', verifyToken, (req, res) => {
    let user = req.user._id;
    Vehicle.find({ owner: user, state: true }, (err, vehiclesDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!vehiclesDB) return res.status(400).json({ ok: false, err: { message: 'Vehicles not Registered' } });
        return res.status(200).json({ ok: true, vehicles: vehiclesDB });
    });

})

vehicleRoute.delete('/vehicle/:id', (req, res) => {
    const id = req.params.id;
    Vehicle.findByIdAndUpdate(id, { state: false }, { new: true }, (err, vehicleDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!vehicleDB) return res.status(400).json({ ok: false, err: { message: 'Vehicle not found !' } });
        return res.status(200).json({ ok: true, vehicle: vehicleDB });
    });
});

module.exports = vehicleRoute;