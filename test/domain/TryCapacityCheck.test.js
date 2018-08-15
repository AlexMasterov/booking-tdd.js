'use strict';

const assert = require('assert');

const tryCapacityCheck = require('../../src/domain/tryCapacityCheck');
const Reservation = require('../../src/domain/Reservation');
const { Result } = require('../../src/domain/FantasyLand');

describe('Domain', () => {
  it('tryCapacityCheck happy path', () => {
    // Stub
    const capacity = 10;
    const reservations = [{ quantity: 1 }];
    const reservation = new Reservation({ quantity: 1 });

    // Execute
    const result = tryCapacityCheck(capacity)(reservations)(reservation);

    // Verify
    assert.ok(result instanceof Result.Ok);
    assert.ok(result.value.isAccepted);
  });

  it('tryCapacityCheck reservation when capacity is insufficient', () => {
    // Stub
    const capacity = 10;
    const reservations = [{ quantity: 10 }];
    const reservation = new Reservation({ quantity: 1 });

    // Execute
    const result = tryCapacityCheck(capacity)(reservations)(reservation);

    // Verify
    assert.ok(result instanceof Result.Error);
    assert.ok(!result.value.isAccepted);
  });
});
