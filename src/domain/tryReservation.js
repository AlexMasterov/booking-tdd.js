'use strict';

const { Future } = require('./FantasyLand');

const tryReservation = (tryValidate, tryAccept) =>
  reservation => tryValidate(reservation).matchWith({
    Ok: ({ value }) => tryAccept(value),
    Error: Future.of,
  });

module.exports = tryReservation;
