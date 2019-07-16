const express = require('express');
const moment = require('moment');
const Reservation = require('../models/reservation');
const reservationRoute = express.Router();

reservationRoute.post('/reservation/:minutes', (req, res) => {
    const body = req.body;
    const minutes = req.params.minutes;

    let end = moment(new Date).add(minutes, 'minutes').toDate();
    let newReservation = new Reservation({
        spot: body.spot,
        vehicle: body.vehicle,
        end: end
    });
    newReservation.save({}, (err, reservationDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        expirate(minutes, reservationDB._id);
        return res.status(200).json({ ok: true, reservation: reservationDB });
    });

});


reservationRoute.put('/reservation/:id', (req, res) => {
    const id = req.params.id;
    const minutes = Number(req.query.extend); // Parametro opcional
    Reservation.findById(id, (err, reservationDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!reservationDB) return res.status(400).json({ ok: false, err: { message: 'Reservation not Found!' } });
        // Si nos da minutes se extiende la reserva...
        if (minutes) {
            let extendedTime = moment(new Date(reservationDB.end)).add(minutes).toDate();
            reservationDB.end = extendedTime;
            reservationDB.state = 'EXTENDIDA';
            reservationDB.save({}, (err, extended) => {
                if (err) return res.status(500).json({ ok: false, err });
                return res.status(200).json({ ok: true, reservation: extended });
            });
            expirate(minutes, reservationDB._id);
        } else { // Si no finaliza la reserva...
            reservationDB.state = 'FINALIZADA';
            reservationDB.save();
            return res.status(200).json({ ok: true, reservation: reservationDB });
        }


    })
});



function expirate(minutos, id) {
    let milis = 60000 * minutos;
    setTimeout(() => {
        Reservation.findById(id, (err, reservationDB) => {
            if (err) console.log(err);
            if (!reservationDB) console.log(err);
            reservationDB.state = 'EXCEDIDA';
            reservationDB.save();
        })
    }, milis);
}
module.exports = reservationRoute;