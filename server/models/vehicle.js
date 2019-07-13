const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let vehicle = new Schema({
    plate: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    description: { brand: { type: String }, type: { type: String }, color: { type: String } },
    state: { type: Boolean, default: true }
});


module.exports = mongoose.model('Vehicle', vehicle, 'vehicles');