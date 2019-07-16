const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const reservationStates = ['VIGENTE', 'EXCEDIDA', 'FINALIZADA', 'EXTENDIDA'];

let reservation = new Schema({
    spot: { type: mongoose.SchemaTypes.ObjectId, ref: 'ParkingSpot', required: true },
    vehicle: { type: mongoose.SchemaTypes.ObjectId, ref: 'Vehicle', required: true },
    end: { type: Date, required: true },
    state: { type: String, enum: reservationStates, default: 'VIGENTE' }
}, { timestamps: { createdAt: 'start' } });

module.exports = mongoose.model('Reservation', reservation, 'reservations');