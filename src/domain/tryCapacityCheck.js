'use strict';

const { Result } = require('./FantasyLand');
const { CapacityExceeded } = require('./Errors');

const tryCapacityCheck = capacity => reservations =>
  reservation => {
    const reservedSeats = reservations
      .reduce((sum, { quantity }) => sum + quantity, 0);

    if (reservedSeats + reservation.quantity >= capacity) {
      return Result.Error(CapacityExceeded(capacity));
    }

    reservation.isAccepted = true;
    return Result.Ok(reservation);
  };

module.exports = tryCapacityCheck;
