const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const reservationStates = ['VIGENTE', 'EXCEDIDA', 'FINALIZADA'];

let reservation = new Schema({
    spot: { type: mongoose.SchemaTypes.ObjectId, ref: 'ParkingSpot' },
    vehicle: { type: mongoose.SchemaTypes.ObjectId, ref: 'Vehicle' },
    end: { type: Date, required: true },
    state: { type: String, enum: reservationStates, default: 'VIGENTE' }
}, { timestamps: { createdAt: 'start' } });

module.exports = mongoose.model('Reservation', reservation, 'reservations');