'use strict';

const assert = require('assert');

const ReservationController = require('../../src/controllers/ReservationController');
const { PastDate, CapacityExceeded, StoreFailure } = require('../../src/domain/Errors');
const { Future, Result } = require('../../src/domain/FantasyLand');

const payload = (status, body) => ({ status, body });

describe('controllers', () => {
  describe('POST /reservations', () => {
    const tests = [
      { result: Result.Ok({ message: 'success' }), expected: payload(201, { message: 'success' }) },
      { result: Result.Error(PastDate()), expected: payload(403, PastDate()) },
      { result: Result.Error(CapacityExceeded()), expected: payload(403, CapacityExceeded()) },
      { result: Result.Error(StoreFailure()), expected: payload(500) },
    ];

    tests.forEach(({ result, expected }) => {
      const name = result.constructor.name;
      it(`ReservationController.post with ${name} returns`, async () => {
        // Stub
        const impure = reservation => Future.of(result);
        const controller = new ReservationController(impure);

        // Execute
        const { status, body } = await controller.post({});

        // Verify
        assert.deepStrictEqual(status, expected.status);
        assert.deepEqual(body, expected.body);
      });
    });
  });
});
