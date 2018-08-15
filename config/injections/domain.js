'use strict';

const { asValue } = require('awilix');

module.exports = container => {
  const cwd = container.resolve('project_dir');

  const capacity = +container.resolve('env').get('APP_CAPACITY');
  container.register('capacity', asValue(capacity));

  container.loadModules([
    'domain/*Store.js',
    'domain/try*.js',
  ], { cwd });

  // JSON Schema (glob?)
  container.resolve('schemas')
    .set('reservation', `${cwd}/domain/ReservationSchema.json`);
};
