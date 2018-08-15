'use strict';

const { Lifetime, asValue } = require('awilix');

module.exports = container => {
  container.loadModules(['controllers/*Controller.js'], {
    cwd: container.resolve('project_dir'),
    resolverOptions: {
      Lifetime: Lifetime.TRANSIENT,
    },
  });
};
