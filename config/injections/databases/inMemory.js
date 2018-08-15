'use strict';

const { aliasTo, asClass, Lifetime } = require('awilix');

module.exports = async container => {
  container.loadModules(['stores/*Store.js'], {
    cwd: container.resolve('project_dir'),
    resolverOptions: {
      register: asClass,
      Lifetime: Lifetime.SINGLETON,
    },
  });

  // Domain
  container.register('ReservationStore', aliasTo('InMemoryStore'));
};
