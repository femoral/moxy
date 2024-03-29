import express, { RequestHandler, Router } from 'express';
import collectionsRouter from './collections';
import pathsRouter from './paths';
import { errorMiddleware } from './middleware/error.middleware';
import bootstrapApp from '../common/bootstrap';

export const makeMoxyApiRouter = ({
  childPort,
  configPath,
  restartMiddleware,
  onChange,
}: {
  childPort: string;
  configPath: string;
  restartMiddleware: RequestHandler;
  onChange: (message: string) => void;
}): Router => {
  const {
    addCollection,
    deleteCollection,
    getCollection,
    getCollections,
    updateCollection,
    addPath,
    deletePath,
    updatePath,
    defaultHandler,
  } = bootstrapApp({ childPort, configPath, onChange });

  const router = Router();

  router.use(express.json());
  router.use(
    '/api/collections',
    collectionsRouter({
      addCollection,
      deleteCollection,
      getCollection,
      getCollections,
      updateCollection,
      restartMiddleware,
    })
  );
  router.use(
    '/api/collections',
    restartMiddleware,
    pathsRouter({
      addPath,
      deletePath,
      updatePath,
    })
  );

  router.use(defaultHandler);
  router.use(errorMiddleware);

  return router;
};
