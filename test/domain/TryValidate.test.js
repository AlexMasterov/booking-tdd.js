'use strict';

const assert = require('assert');

const tryValidate = require('../../src/domain/tryValidate');
const Reservation = require('../../src/domain/Reservation');
const { PastDate } = require('../../src/domain/Errors');
const { Result } = require('../../src/domain/FantasyLand');

describe('Domain', () => {
  it('tryValidate happy path', () => {
    // Stub
    const isReservationInPast = () => false;
    const reservation = new Reservation({ date: new Date() });

    // Execute
    const result = tryValidate(isReservationInPast)(reservation);

    // Verify
    assert.ok(result instanceof Result.Ok);
    assert.deepStrictEqual(result.value, reservation);
  });

  it('tryValidate reservation in the past', () => {
    // Stub
    const isReservationInPast = () => true;
    const reservation = new Reservation({ date: new Date() });

    // Execute
    const result = tryValidate(isReservationInPast)(reservation);

    // Verify
    assert.ok(result instanceof Result.Error);
    assert.deepStrictEqual(result.value, PastDate());
  });

  it('tryValidate happy path with a real Date', () => {
    // Stub
    const date = new Date(); date.setHours(date.getHours() + 1);
    const reservation = new Reservation({ date });

    // Execute
    const result = tryValidate(/* inpureGuard */)(reservation);

    // Verify
    assert.ok(result instanceof Result.Ok);
    assert.deepStrictEqual(result.value, reservation);
  });

  it('tryValidate reservation in the past with a real Date', () => {
    // Stub
    const date = new Date(); date.setHours(date.getHours() - 1);
    const reservation = new Reservation({ date });

    // Execute
    const result = tryValidate(/* inpureGuard */)(reservation);

    // Verify
    assert.ok(result instanceof Result.Error);
    assert.deepStrictEqual(result.value, PastDate());
  });
});
