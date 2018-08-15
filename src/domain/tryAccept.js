'use strict';

const { Future, Result } = require('./FantasyLand');
const { StoreFailure } = require('./Errors');

const tryAccept = (tryCapacityCheck, ReservationStore) =>
  reservation => Future
    // impure
    .tryP(() => ReservationStore.read(reservation.date)).mapRej(StoreFailure)
    // pure
    .map(reservations => tryCapacityCheck(reservations)(reservation))
    // impure
    .chain(result => result.matchWith({
      Ok: ({ value }) => Future.tryP(() => ReservationStore.create(value)).mapRej(StoreFailure).map(_ => value),
      Error: ({ value }) => Future.reject(value),
    }))
    .fold(Result.Error, Result.Ok);

module.exports = tryAccept;
