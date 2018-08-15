'use strict';

const { asValue } = require('awilix');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { parse } = require('dotenv');

const envPath = resolve(process.cwd(), '.env');
const parsed = parse(readFileSync(envPath));

const env = new Map(Object.entries(parsed));

for (const [key, value] of env) {
  if (process.env[key] !== undefined) {
    env.set(key, process.env[key]);
  }
}

module.exports = container => {
  container.register('env', asValue(env));
};
