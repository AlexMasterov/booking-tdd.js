'use strict';

const { union, any } = require('./FantasyLand');

const Errors = union('Errors', {
  PastDate() {
    return { message: 'Reservation in the past' };
  },

  CapacityExceeded(capacity) {
    return { message: `Exceeded quota (${capacity}) capacity` };
  },

  StoreFailure(error) {
    return { error };
  },
});

Errors.Unknown = any;

module.exports = Errors;
