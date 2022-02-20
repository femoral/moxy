import express, {NextFunction, Request, Response} from "express";
import cors from "cors";
import {
  makeGetCollectionsUseCase,
  makeJsonGetCollectionRepository,
  makeJsonGetCollectionsRepository
} from "@moxy/collections";
import {join} from "path";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

const [, , port, configPath] = process.argv;

const collectionsBasePath = join(configPath, "collections");

const getCollectionUseCase = makeGetCollectionsUseCase({
  getCollections: makeJsonGetCollectionsRepository({
    collectionsBasePath,
    getCollection: makeJsonGetCollectionRepository({ collectionsBasePath }),
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
      collection.paths.forEach((path) => {
        try {
          app[path.method](
            `/${collection.basePath}${path.path}`,
            path.handler.bind(path)
          );
        } catch (e) {
          console.error(
            `failed to load path: ${path.id} on collection: ${collection.name}`
          );
        }
      });
    } catch (e) {
      console.error(
        `failed to load collection: ${collection.id} - ${collection.name}`
      );
    }
  });

  app.listen(port, () => {
    process.send?.(`Moxy server starting on port: ${port}`);
  });
})();
