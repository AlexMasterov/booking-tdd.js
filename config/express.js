'use strict';

const makeInvoker = require('./awilix/makeInvoker');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = container => {
  const invoker = makeInvoker(container);

  function middleware(middleware) {
    const [handler, method] = middleware.split(':', 2);
    const invoke = invoker(handler, method);
    return (req, res, next) => invoke(req, res, next);
  }

  function route(controller) {
    const [action, method] = controller.split(':', 2);
    const invoke = invoker(action, method);
    return (req, res, next) => {
      const payload = invoke(req);
      // Thenables
      if (Reflect.has(payload, 'then')) {
        return payload
          .then(payload => responder(res, payload))
          .catch(() => next());
      }

      return responder(res, payload);
    };
  }

  function responder(res, payload) {
    const { status=200, body } = payload;
    return res.status(status).json(body);
  }

  const app = express();

  // Headers
  app.set('x-powered-by', false);

  // Handlers
  app.use(bodyParser.json());

  // Routes
  app.post('/reservations',
    middleware('json_schema.reservation'),
    middleware('input.reservation'),
    route('ReservationController:post')
  );

  // Error Handler
  app.use((err, req, res, next) =>
    res.status(500).send('Something went wrong..'));

  return app;
};
