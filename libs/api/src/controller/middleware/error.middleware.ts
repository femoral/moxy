import { ErrorRequestHandler, RequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).send({ message: error.message, metadata: error.metadata });
};

export const catchErrors =
  (action: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await action(req, res, next);
    } catch (e) {
      next(e);
    }
  };
