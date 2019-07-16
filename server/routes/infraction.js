const express = require('express');
const Infraction = require('../models/infraction');
const infractionRoute = express.Router();

const { verifyToken, verifyAgentRole } = require('../middleware/auth');

infractionRoute.post('/infraction', [verifyToken, verifyAgentRole], (req, res) => {
    let body = req.body;
    let agentId = req.user._id;
    let newInfraction = new Infraction({
        reservation: body.reservation,
        agent: agentId,
        penalty: { motive: body.motive, value: body.value }
    });

    newInfraction.save({}, (err, infractionDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        return res.status(200).json({ ok: true, infraction: infractionDB });
    });
});

infractionRoute.get('/infraction', verifyToken, (req, res) => {
    let id = req.user._id;
    Infraction.find({ agent: id, state: 'POR_PAGAR' }, (err, infractionDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!infractionDB) return res.status(400).json({ ok: false, err: { message: 'Agent not found' } });
        return res.status(200).json({ ok: true, infractions: infractionDB });
    });
});

infractionRoute.put('/infraction/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    let state = req.body.state;
    Infraction.findById(id, (err, infractionDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!infractionDB) return res.status(400).json({ ok: false, err: { message: 'Infraction not found' } });
        infractionDB.state = state;
        infractionDB.save();
        return res.status(200).json({ ok: true, infraction: infractionDB });
    })

});

module.exports = infractionRoute;