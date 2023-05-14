import express from 'express';
import { makeChildController } from '@moxy-js/child';
import { makeMoxyApiRouter } from './controller';
import { makeRestartMiddleware } from './controller/middleware/restart.middleware';
import { join } from 'path';
import { homedir } from 'os';

export const startDev = () => {
  const app = express();

  const configPath = join(homedir(), '.moxy');
  const childPort = '3501';

  const childController = makeChildController({
    childPort,
    debounceTime: 5000,
    configPath,
  });

  const moxyApiRouter = makeMoxyApiRouter({
    childPort,
    restartMiddleware: makeRestartMiddleware(childController),
    configPath,
    onChange: (message) => console.log(message),
  });

  app.use(moxyApiRouter);

  app.listen(3500, async () => {
    console.log(`API server started on port 3500`);
    await childController.start();
  });
};
