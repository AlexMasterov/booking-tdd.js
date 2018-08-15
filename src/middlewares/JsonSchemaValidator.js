'use strict';

const JsonSchemaValidator = validate =>
  (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) {
      const { message, errors } = validate;
      return res.status(400).send({ message, errors });
    }

    next();
  };

const AsyncJsonSchemaValidator = validate =>
  async (req, res, next) => {
    try {
      await validate(req.body);
    } catch ({ message, errors }) {
      return res.status(400).send({ message, errors });
    }

    next();
  };

module.exports = {
  JsonSchemaValidator,
  AsyncJsonSchemaValidator,
};
