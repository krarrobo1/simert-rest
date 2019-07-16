const express = require('express');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const User = require('../models/user');
const login = express.Router();

login.post('/login', (req, res) => {
    const body = req.body;
    User.findOne({ email: body.email }, (err, userDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!userDB) return res.status(400).json({ ok: false, err: { message: '403. Email* or Password Incorrect' } });
        if (!validatePassword(body.password, userDB.password)) return res.status('403. Email or Password* Incorrect');
        let token = JWT.sign({ user: userDB }, process.env.SEED, { expiresIn: '48h' });
        res.status(200).json({ ok: true, user: userDB, token });
    });
});

async function validatePassword(data, encrypted) {
    let same = bcrypt.compare(data, encrypted);
    return same;
}

module.exports = login;