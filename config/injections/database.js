'use strict';

function databaseResolver(container) {
  const database = container.resolve('env').get('APP_DATABASE');
  switch (database) {
    case 'mongodb': return 'mongodb';
    case 'memory': return 'inMemory';

    default:
      console.error(`The '${database}' database is not supported`);
      process.exit(1);
  }
}

module.exports = async container => {
  const database = databaseResolver(container);
  await require(`./databases/${database}`)(container);
};
