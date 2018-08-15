'use strict';

const { Result } = require('./FantasyLand');
const { PastDate } = require('./Errors');

// Just an example
const inpureGuard = ({ date }) => date < Date.now();

const tryValidate = (isReservationInPast=inpureGuard) =>
  reservation => isReservationInPast(reservation)
    ? Result.Error(PastDate())
    : Result.Ok(reservation);

module.exports = tryValidate;
