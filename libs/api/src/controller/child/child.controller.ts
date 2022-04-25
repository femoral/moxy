import { ServerResponse } from 'http';
import { Request, Response } from 'express';
import { createProxyServer } from 'http-proxy';
import { Observer } from '../../common/observer';
import { HttpEvent } from '@moxy-js/dto';
import { v4 } from 'uuid';

export const createChildHandler = ({
  childPort,
  requestObserver,
}: {
  childPort: string;
  requestObserver: Observer<HttpEvent>;
}) => {
  const proxyServer = createProxyServer({
    target: `http://localhost:${childPort}`,
  });

  proxyServer.on('error', (error, req, res) => {
    console.error(error.message);

    if (res instanceof ServerResponse) {
      res.writeHead(502, {
        'Content-Type': 'text/plain',
      });
    }

    res.end('Failed to proxy request to child server');
  });

  proxyServer.on('proxyReq', (proxyReq, req) => {
    const data: Uint8Array[] = [];

    req.on('data', (chunk) => {
      data.push(chunk);
    });

    req.on('end', () => {
      requestObserver.notify({
        id: (req as any).eventId,
        baseUrl: req.url,
        method: req.method,
        type: 'REQUEST',
        body: Buffer.concat(data).toString(),
        collectionId: '',
        headers: req.headers,
      });
    });
  });

  proxyServer.on('proxyRes', (proxyRes, req) => {
    const data: Uint8Array[] = [];

    proxyRes.on('data', (chunk) => {
      data.push(chunk);
    });

    proxyRes.on('end', () => {
      requestObserver.notify({
        id: (req as any).eventId,
        baseUrl: req.url,
        method: req.method,
        type: 'RESPONSE',
        body: Buffer.concat(data).toString(),
        collectionId: '',
        headers: req.headers,
      });
    });
  });

  return (req: Request, res: Response) => {
    (req as any).eventId = v4();

    proxyServer.web(req, res);
  };
};
