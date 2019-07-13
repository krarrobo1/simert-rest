const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const motives = ['Retraso de 16 a 30 min', 'Retraso de 31 a 60 min', 'Retraso de 61 a 120 min', 'Retraso de 121 min'];
const values = [3, 5, 10, 40];
const state = ['PAGADA', 'POR_PAGAR']
let infraction = new Schema({
    reservation: { type: mongoose.SchemaTypes.ObjectId, ref: 'Reservation' },
    agent: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
    penalty: { motive: { type: String, enum: motives, default: 'Retraso de 16 a 30 min' }, value: { type: Number, enum: value, default: '3' } },
    state: { type: String, enum: state, default: 'POR_PAGAR' }
});