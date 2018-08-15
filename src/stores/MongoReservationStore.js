'use strict';

const MongoReadReservations = collection =>
  async date => await collection.find({ date: { $gte: date } }).toArray();

const MongoCreateReservation = collection =>
  async reservation => await collection.insertOne({ ...reservation });

module.exports = {
  MongoReadReservations,
  MongoCreateReservation,
};
