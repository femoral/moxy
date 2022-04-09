import { ServerResponse } from 'http';
import { Request, Response } from 'express';
import { createProxyServer } from 'http-proxy';
import { Observer } from '../../common/observer';
import { HttpEvent } from '@moxy-js/dto';

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
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    });

    req.on('end', () => {
      requestObserver.notify({
        baseUrl: req.url,
        method: req.method,
        type: 'REQUEST',
        body: data.toString(),
        collectionId: '',
        headers: req.headers,
      });
    });
  });

  return (req: Request, res: Response) => {
    proxyServer.web(req, res);
  };
};
