import { makeChildController } from '@moxy-js/child';
import { makeMoxyApiRouter } from './controller';
import { makeRestartMiddleware } from './controller/middleware/restart.middleware';
import { startDev } from './app';

const makeMoxyApi = ({
  childPort,
  configPath,
  debounceTime,
  onChange,
}: {
  childPort: string;
  configPath: string;
  debounceTime: number;
  onChange: (message: string) => void;
}) => {
  const childController = makeChildController({
    childPort,
    debounceTime,
    configPath,
  });

  const moxyApiRouter = makeMoxyApiRouter({
    childPort,
    restartMiddleware: makeRestartMiddleware(childController),
    configPath,
    onChange,
  });

  return {
    childController,
    moxyApiRouter,
  };
};

if (require.main === module) {
  startDev();
}

export default makeMoxyApi;
