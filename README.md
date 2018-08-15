## Booking Demo; functional TDD attempt
My previous [attempt with PHP](https://github.com/AlexMasterov/booking-tdd-demo).

## Challenge
* Decoupling decisions from effects

  **Solution:** The world is impure. Instead, we strive towards implementing as much of our code base as pure functions, so that an application is impure only at its boundaries. Using functional composition with monads, we can succinctly conditionally compose from pure and impure functions.

  **Benefits:** Pure functions only makes a decision based on input, and returns information about this decision as output, so is easy to unit test. Impure functions are used as [humble functions](http://xunitpatterns.com/Humble%20Object.html) that you may don't need to unit test. Impure functions can call pure functions, so at the boundary, an application must gather impure data, and use it to call pure functions. This [automatically leads to the ports and adapters architecture](http://blog.ploeh.dk/2016/03/18/functional-architecture-is-ports-and-adapters).

## History

[From Dependency injection to dependency rejection](https://www.youtube.com/watch?v=ccoxSBCE_K8) video by Mark Seemann\
[From dependency injection to dependency rejection](http://blog.ploeh.dk/2017/01/27/from-dependency-injection-to-dependency-rejection/ ) text by Mark Seemann\
[Test-Driven Development with F#](https://www.pluralsight.com/courses/fsharp-test-driven-development) course by Mark Seemann\
[Dependency Rejection and TDD without Mocks](https://www.youtube.com/watch?v=9zpG_hJsrL8) video by Антон Молдован

## Packages
  * [Express](https://github.com/expressjs/express) (HTTP)
  * [Awilix](https://github.com/jeffijoe/awilix) (IoC)
  * [Fluture](https://github.com/fluture-js/Fluture) (Asynchronous monadic structure)
  * [Folktale](https://github.com/origamitower/folktale) (Result, ADT)
  * [Ajv](https://github.com/epoberezkin/ajv) (JSON Schema validator)
  * [Bristol](https://github.com/TomFrost/Bristol) (Logger)
  * [MongoDB](https://github.com/mongodb/node-mongodb-native) (DB, _optional_)

## Requirements
To run this application, you will need:

 * [Node.js 9.0+](https://nodejs.org)
 * npm or something similar

## Installation

```sh
npm install
```

## Usage

```sh
npm run start
npm run test
```

## Environment variables
See [`.env`](https://github.com/AlexMasterov/booking-tdd.js/blob/master/.env) file.

```sh
APP_CAPACITY = 10
APP_DATABASE = 'memory'
NODE_ENV = 'production'
HTTP_HOST = 'localhost'
HTTP_PORT = 80
MONGODB_URL = 'mongodb://localhost:27017/booking?connectTimeoutMS=300'
JSONSCHEMA_ASYNC_VALIDATE = true
```

### Example request
```bash
curl -X POST http://localhost/reservations/ \
 -H 'Content-Type: application/json' \
 -d '{"date": "Y-m-d H:i:s", "name": "Some name", "email": "Some email", "quantity": 1}'
```
