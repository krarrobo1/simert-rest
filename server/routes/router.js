const express = require('express');
const user = require('./user');
const login = require('./login');
const vehicle = require('./vehicle');
const parkingSpot = require('./parkingSpot');
const reservation = require('./reservation');
const infraction = require('./infraction');

let app = express();

app.use(user);
app.use(login);
app.use(vehicle);
app.use(parkingSpot);
app.use(reservation);
app.use(infraction);

module.exports = app;