'use strict';

const { asValue, asFunction } = require('awilix');
const Ajv = require('ajv');

function validateFactory({ ajv }) {
  return schemaName => ajv.getSchema(schemaName);
}

module.exports = container => {
  const ajv = new Ajv();

  const needAsync = container.resolve('env').get('JSONSCHEMA_ASYNC_VALIDATE') === 'true';
  container.resolve('schemas').forEach((path, name) => {
    let schema = require(path);
    if (needAsync) schema = { "$async": true, ...schema };
    ajv.addSchema(schema, name);
  });

  container.register('ajv', asValue(ajv));
  container.register('ajv_factory', asFunction(validateFactory).proxy());
};
