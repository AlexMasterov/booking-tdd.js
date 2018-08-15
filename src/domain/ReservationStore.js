'use strict';

class ReservationStore {
  constructor(readReservations, createReservation) {
    this.read = readReservations;
    this.create = createReservation;
  }
}

module.exports = ReservationStore;
