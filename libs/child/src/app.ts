import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import {
  makeCollectionToCollectionModelMapper,
  makeGetCollectionsUseCase,
  makeJsonGetCollectionRepository,
  makeJsonGetCollectionsRepository,
} from '@moxy-js/collections';
import { join } from 'path';
import { proxyServer } from './proxy';
import { makePathToPathModelMapper } from '@moxy-js/paths';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const [, , port, configPath] = process.argv;

const collectionsBasePath = join(configPath, 'collections');

const pathMapper = makePathToPathModelMapper({ proxyServer });
const collectionMapper = makeCollectionToCollectionModelMapper({ pathMapper });

const getCollectionUseCase = makeGetCollectionsUseCase({
  getCollections: makeJsonGetCollectionsRepository({
    collectionsBasePath,
    getCollection: makeJsonGetCollectionRepository({ collectionsBasePath, collectionMapper }),
  }),
});

(async () => {
  const app = express();

  app.use(cors());
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method.toUpperCase()} ${req.path}`);
    next();
  });

  (await getCollectionUseCase.execute()).forEach((collection) => {
    try {
      const router = express.Router();

      collection.paths.forEach((path) => {
        try {
          router[path.method](`${path.path}`, path.handler.bind(path));
        } catch (e) {
          console.error(`failed to load path: ${path.id} on collection: ${collection.name}`);
        }
      });

      if (collection.fallbackProxy) router.all(`/*`, collection.fallbackProxy.handler.bind(collection.fallbackProxy));

      app.use(`/${collection.basePath}`, router);
    } catch (e) {
      console.error(`failed to load collection: ${collection.id} - ${collection.name}`);
    }
  });

  app.listen(port, () => {
    process.send?.(`Moxy server starting on port: ${port}`);
  });
})();
