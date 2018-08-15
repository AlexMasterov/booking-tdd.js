'use strict';

const { asFunction } = require('awilix');
const { Bristol } = require('bristol');

function makeBristol() {
  const logger = new Bristol();
  logger.addTarget('console')
    .withFormatter('human', { dateFormat: 'HH:mm:ss' });

  return logger;
}

module.exports = container => {
  container.register('bristol', asFunction(makeBristol));
};
