'use strict';

function checkMethod(invoke, method) {
  if (!Reflect.has(invoke, method)) {
    console.error(`Method '${invoke.constructor.name}.${method}' not found`);
    process.exit(1);
  }
}

function makeInvoker(container) {
  return (name, method) => {
    let invoke;

    try {
      invoke = container.cradle[name];
    } catch ({ message }) {
      console.error(message);
      process.exit(1);
    }

    if (typeof method === 'string') {
      checkMethod(invoke, method);
      return (...args) => invoke[method](...args);
    }

    return (...args) => invoke(...args);
  };
}

module.exports = makeInvoker;
