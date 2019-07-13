const express = require('express');
const user = require('./user');
const login = require('./login');
const vehicle = require('./vehicle');

let app = express();

app.use(user);
app.use(login);
app.use(vehicle);

module.exports = app;