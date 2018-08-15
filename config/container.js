'use strict';

const { InjectionMode, aliasTo, asValue, createContainer } = require('awilix');

async function configureContainer() {
  const container = createContainer({ injectionMode: InjectionMode.CLASSIC })
    .register('project_dir', asValue(`${process.cwd()}/src`))
    .register('schemas', asValue(new Map));

  // env
  require('./injections/dotenv')(container);

  // Logger
  const needLog = container.resolve('env').get('LOGGER') === 'true';
  if (needLog) {
    require('./injections/bristol')(container);
    container.register('logger', aliasTo('bristol'));
  }

  // Domain
  require('./injections/domain')(container);

  // Database
  await require('./injections/database')(container);

  // Json Schema Validator
  require('./injections/ajv')(container);
  container.register('validate_factory', aliasTo('ajv_factory'));

  // Entry points
  require('./injections/middlewares')(container);
  require('./injections/controllers')(container);

  return container;
}

module.exports = configureContainer;
