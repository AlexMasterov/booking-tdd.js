'use strict';

const { asValue, asFunction, Lifetime } = require('awilix');
const {
  JsonSchemaValidator,
  AsyncJsonSchemaValidator,
} = require(`${process.cwd()}/src/middlewares/JsonSchemaValidator`);

function makeValidator(schemaName) {
  return ({ validate_factory }) => JsonSchemaValidator(validate_factory(schemaName));
}
function makeAsyncValidator(schemaName) {
  return ({ validate_factory }) => AsyncJsonSchemaValidator(validate_factory(schemaName));
}

module.exports = container => {
  container.loadModules(['controllers/*Input.js'], {
    formatName: (name, descriptor) => {
      const [concern, type] = name.split(/(?=[A-Z])/).map(part => part.toLowerCase());
      return `${type}.${concern}`;
    },
    cwd: container.resolve('project_dir'),
    resolverOptions: {
      register: asValue,
      Lifetime: Lifetime.TRANSIENT,
    },
  });

  const needAsync = container.resolve('env').get('JSONSCHEMA_ASYNC_VALIDATE') === 'true';
  const validatorFactory = needAsync ? makeAsyncValidator : makeValidator;

  container.register(
    'json_schema.reservation',
    asFunction(validatorFactory('reservation')).proxy()
  );
};
