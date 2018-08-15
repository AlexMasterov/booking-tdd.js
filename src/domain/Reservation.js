'use strict';

class Reservation {
  constructor({ date, name, email, quantity }) {
    this.date = date;
    this.name = name;
    this.email = email;
    this.quantity = quantity;
    this.isAccepted = false;
  }
}

module.exports = Reservation;
