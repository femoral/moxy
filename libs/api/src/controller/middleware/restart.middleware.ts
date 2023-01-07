import { NextFunction, Request, Response } from 'express';
import { ChildController } from '@moxy/child';

export const makeRestartMiddleware =
  (childController: ChildController) =>
  (req: Request, res: Response, next: NextFunction) => {
    res.on('close', async () => {
      if (res.statusCode && res.statusCode < 400) childController.restart();
    });
    next();
  };
