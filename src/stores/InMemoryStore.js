'use strict';

class InMemoryStore {
  constructor(Arr = []) {
    this.reservations = Arr;
  }

  async read(date) {
    return this.reservations
      .filter(({ date: reservedDate }) => reservedDate >= date);
  }

  async create(reservation) {
    await this.reservations.push(reservation);
  }
}

module.exports = InMemoryStore;
