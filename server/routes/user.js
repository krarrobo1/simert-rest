const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

let userRoute = express.Router();
userRoute.get('/user/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id, (err, userDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!userDB) return res.status(400).json({ ok: false, err: { message: '400. User Not Found' } });
        return res.status(200).json({ ok: true, user: userDB });
    });
});

userRoute.post('/user/signin', (req, res) => {
    const body = req.body;
    let newUser = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role || 'USER_ROLE',
        account: { credit: 0.25, state: true }
    });
    newUser.save((err, userDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        return res.status(200).json({ ok: true, user: userDB })
    });
});

userRoute.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;

    User.findById(id, (err, userDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!userDB) return res.status(400).json({ ok: false, err: { message: '400. User Not Found' } });
        for (const key in body) {
            if (userDB.hasOwnProperty(key)) {
                userDB[key] = body[key]
            }
        }
        if (body.hasOwnProperty('credit')) userDB.account.credit = body[credit];
        return res.status(200).json({ ok: true, user: userDB })
    });
});

userRoute.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove(id, (err, userDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!userDB) return res.status(400).json({ ok: false, err: { message: '400. User Not Found' } });
        return res.status(200).json({ ok: true, message: 'User deleted!' })
    });
});

module.exports = userRoute;