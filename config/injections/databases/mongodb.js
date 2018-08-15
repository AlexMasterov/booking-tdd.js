'use strict';

const { aliasTo, asClass, asValue } = require('awilix');
const { MongoClient } = require('mongodb');

function makeMongoClientClass() {
  return asClass(MongoClient)
    .classic()
    .inject(({ resolve }) => ({
      url: resolve('env').get('MONGODB_URL'),
      options: { useNewUrlParser: true },
    }))
    .singleton()
    .disposer(client => client.close());
}

async function tryConnect(client) {
  try {
    await client.connect();
  } catch ({ name, message }) {
    console.error(`${name}: ${message}`);
    process.exit(1);
  }

  return client;
}

module.exports = async container => {
  const mongoClass = makeMongoClientClass();
  const client = container.build(mongoClass);

  container.register('mongodb', asValue(await tryConnect(client)));

  require('./mongodb_collection')(container);
};
