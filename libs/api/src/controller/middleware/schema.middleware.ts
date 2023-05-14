import { RequestHandler } from 'express';
import { ValidateFunction } from 'ajv';
import { ValidationError } from '../../common/error/validation.error';

export const schemaMiddleware =
  (validate: ValidateFunction): RequestHandler =>
  (req, res, next) => {
    if (validate(req.body)) {
      next();
    } else {
      next(new ValidationError('Invalid request', validate.errors));
    }
  };
