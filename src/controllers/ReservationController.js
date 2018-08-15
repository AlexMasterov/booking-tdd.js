'use strict';

const payload = (status, body) => ({ status, body });

class ReservationController {
  constructor(tryReservation) {
    this.tryReservation = tryReservation;
  }

  async post({ body: reservation }) {
    const result = await this.tryReservation(reservation).promise();

    return result.matchWith({
      Ok: ({ value }) => payload(201, value),
      Error: ({ value }) => value.matchWith({
        PastDate: ({ message }) => payload(403, { message }),
        CapacityExceeded: ({ message }) => payload(403, { message }),
        StoreFailure: () => payload(500),
      }),
    });
  }
}

module.exports = ReservationController;
