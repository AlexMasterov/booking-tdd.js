'use strict';

const { Reservation } = require('../domain');

const ReservationInput = (req, res, next) => {
  const { date, name, email, quantity } = req.body;

  req.body = new Reservation({
    date: new Date(date),
    name,
    email,
    quantity,
  });

  next();
};

module.exports = ReservationInput;
