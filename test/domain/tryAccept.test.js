'use strict';

const assert = require('assert');

const tryAccept = require('../../src/domain/tryAccept');
const Reservation = require('../../src/domain/Reservation');
const ReservationStore = require('../../src/domain/ReservationStore');
const { StoreFailure, CapacityExceeded } = require('../../src/domain/Errors');
const { Future, Result } = require('../../src/domain/FantasyLand');

describe('Domain', () => {
  it('tryAccept behaves correctly when it can accept', async () => {
    // Stub
    const reservation = new Reservation({ date: new Date(), quantity: 1 });
    const tryCapacityCheck = reservations => reservation => Result.Ok(reservation);

    const readReservations = async () => Promise.resolve(1);
    const createReservation = async () => Promise.resolve(undefined);
    const store = new ReservationStore(readReservations, createReservation);

    // Execute
    const result = await tryAccept(tryCapacityCheck, store)(reservation).promise();

    // Verify
    assert.ok(result instanceof Result.Ok);
    assert.deepStrictEqual(result.value, reservation);
  });

  it('tryAccept behaves correctly when it can`t accept', async () => {
    // Stub
    const reservation = new Reservation({ date: new Date(), quantity: 1 });
    const tryCapacityCheck = reservations => reservation => Result.Error(CapacityExceeded());

    const readReservations = async () => Promise.resolve(1);
    const createReservation = async () => Promise.resolve(undefined);
    const store = new ReservationStore(readReservations, createReservation);

    // Execute
    const result = await tryAccept(tryCapacityCheck, store)(reservation).promise();

    // Verify
    assert.ok(result instanceof Result.Error);
    assert.ok(result.value instanceof CapacityExceeded);
  });

  it('tryAccept behaves correctly then ReservationStore.read throws', async () => {
    // Stub
    const reservation = new Reservation({ date: new Date(), quantity: 1 });
    const tryCapacityCheck = reservations => reservation => Result.Ok(reservation);

    const error = new Error('readReservations');

    const readReservations = async () => { throw error; };
    const createReservation = async () => Promise.resolve(undefined);
    const store = new ReservationStore(readReservations, createReservation);

    // Execute
    const result = await tryAccept(tryCapacityCheck, store)(reservation).promise();

    // Verify
    assert.ok(result instanceof Result.Error);
    assert.ok(result.value instanceof StoreFailure);
    assert.deepStrictEqual(result.value.error, error);
  });

  it('tryAccept behaves correctly then ReservationStore.create throws', async () => {
    // Stub
    const reservation = new Reservation({ date: new Date(), quantity: 1 });
    const tryCapacityCheck = reservations => reservation => Result.Ok(reservation);

    const error = new Error('createReservation');

    const readReservations = async () => Promise.resolve(1);
    const createReservation = async () => { throw error; };
    const store = new ReservationStore(readReservations, createReservation);

    // Execute
    const result = await tryAccept(tryCapacityCheck, store)(reservation).promise();

    // Verify
    assert.ok(result instanceof Result.Error);
    assert.ok(result.value instanceof StoreFailure);
    assert.deepStrictEqual(result.value.error, error);
  });
});
