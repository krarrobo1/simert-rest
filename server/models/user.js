const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/*mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);*/

let validRoles = {
    values: ['AGENT_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
};

let Schema = mongoose.Schema;

let user = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: validRoles, required: true, default: 'USER_ROLE' },
    account: { credit: { type: Number, default: 0.25 }, state: { type: Boolean, default: true } },
});

user.methods.toJSON = function() {
    let user = this;
    let userObj = user.toObject();
    delete userObj.password;
    return userObj;
};

user.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('User', user, 'users');