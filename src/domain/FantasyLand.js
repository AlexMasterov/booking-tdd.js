'use strict';

const Future = require('fluture');
const Result = require('folktale/result');
const { union } = require('folktale/adt/union');
const { any } = union;

module.exports = {
  Future,
  Result,
  any,
  union,
};
