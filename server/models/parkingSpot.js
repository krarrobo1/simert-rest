const mongoose = require('mongoose');

let Schema = mongoose.Schema;

zones = ['A', 'B'];
let parkingSpot = new Schema({
    type: { type: String, default: 'Feature' },
    properties: {
        zone: { type: String, enum: zones, default: 'A' },
        state: { type: Boolean, default: true },
        "marker-color": { type: String },
        "marker-size": { type: String, default: "medium" },
        "marker-symbol": { type: String, default: "car" }
    },
    geometry: {
        type: {
            type: String,
            default: 'Point',
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

});


module.exports = mongoose.model('ParkingSpot', parkingSpot, 'spots');