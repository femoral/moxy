import { Request, Response } from 'express';
import { Observer } from '../../common/observer';
import { HttpEvent } from '@moxy-js/dto';

export const createHttpEventController =
  ({ httpEventObserver }: { httpEventObserver: Observer<HttpEvent> }) =>
  (req: Request, res: Response) => {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': req.headers.origin,
    });

    const subscription = httpEventObserver.subscribe((value) => {
      res.write(`data: ${JSON.stringify(value)}\n\n`);
    });

    req.on('close', () => {
      subscription.unsubscribe();
    });
  };
