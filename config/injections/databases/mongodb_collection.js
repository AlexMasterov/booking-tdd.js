'use strict';

const { aliasTo, asFunction } = require('awilix');
const {
  MongoCreateReservation,
  MongoReadReservations,
} = require(`${process.cwd()}/src/stores/MongoReservationStore`);

function makeCollection(db, collection) {
  return asFunction(({ mongodb }) =>
    mongodb.db(db).collection(collection)).proxy();
}

function makeFunction(fn, collection) {
  return asFunction(fn)
    .inject(({ resolve }) => ({ collection: resolve(collection) }));
}

module.exports = async container => {
  // Collections
  container.register('mongodb_reservation',
    makeCollection('booking', 'reservation').singleton());

  // Functions
  container.register('mongodb_read_reservations',
    makeFunction(MongoReadReservations, 'mongodb_reservation').transient());
  container.register('mongodb_create_reservation',
    makeFunction(MongoCreateReservation, 'mongodb_reservation').transient());

  // Domain
  container.register('readReservations', aliasTo('mongodb_read_reservations'));
  container.register('createReservation', aliasTo('mongodb_create_reservation'));
};
