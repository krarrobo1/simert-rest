const mongoose = require('mongoose');

let Schema = mongoose.Schema;

zones = ['A', 'B']
let parkingSpot = new Schema({
    properties: {
        zone: { type: String, enum: zones, default: 'A' },
        state: { type: Boolean, default: true }
    },
    type: {
        type: String,
        default: 'Point',
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

module.exports = mongoose.model('ParkingSpot', parkingSpot, 'spots');