import { createProxyServer } from 'http-proxy';
import {
  makeCreateCollectionUseCase,
  makeDeleteCollectionUseCase,
  makeGetCollectionsUseCase,
  makeGetCollectionUseCase,
  makeJsonCreateCollectionRepository,
  makeJsonDeleteCollectionRepository,
  makeJsonGetCollectionRepository,
  makeJsonGetCollectionsRepository,
  makeJsonUpdateCollectionRepository,
  makeUpdateCollectionUseCase,
} from '@moxy/collections';
import {
  makeAddPathUseCase,
  makeDeletePathUseCase,
  makeUpdatePathUseCase,
} from '@moxy/collections';
import { makeAddCollectionController } from '../controller/collections/add-collection.controller';
import { makeAddPathController } from '../controller/paths/add-path.controller';
import { join } from 'path';
import { makeDeleteCollectionController } from '../controller/collections/delete-collection.controller';
import { makeGetCollectionController } from '../controller/collections/get-collection.controller';
import { makeGetCollectionsController } from '../controller/collections/get-collections.controller';
import { makeUpdateCollectionController } from '../controller/collections/update-collection.controller';
import { makeDeletePathController } from '../controller/paths/delete-path.controller';
import { makeUpdatePathController } from '../controller/paths/update-path.controller';
import { Request, Response } from 'express';
import { makeChangeMiddleware } from '../data/middleware/change.middleware';
import { ServerResponse } from 'http';

export type AppConfig = {
  childPort: string;
  configPath: string;
  onChange: (message: string) => void;
};

const bootstrapApp = ({ childPort, configPath, onChange }: AppConfig): any => {
  const collectionsBasePath = join(configPath, 'collections');

  const createCollectionRepository = makeChangeMiddleware({
    changeFunction: makeJsonCreateCollectionRepository({
      collectionsBasePath,
    }),
    onChange,
    messagePrefix: 'created collection: ',
  });

  const getCollectionRepository = makeJsonGetCollectionRepository({
    collectionsBasePath,
  });

  const getCollectionsRepository = makeJsonGetCollectionsRepository({
    collectionsBasePath,
    getCollection: getCollectionRepository,
  });

  const updateCollectionRepository = makeChangeMiddleware({
    changeFunction: makeJsonUpdateCollectionRepository({
      collectionsBasePath,
    }),
    onChange,
    messagePrefix: 'updated collection: ',
  });

  const deleteCollectionRepository = makeChangeMiddleware({
    changeFunction: makeJsonDeleteCollectionRepository({
      collectionsBasePath,
    }),
    onChange,

    messagePrefix: 'deleted collection: ',
  });

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

  return {
    addCollection: makeAddCollectionController({
      createCollectionUseCase: makeCreateCollectionUseCase({
        createCollection: createCollectionRepository,
      }),
    }),
    deleteCollection: makeDeleteCollectionController({
      deleteCollectionUseCase: makeDeleteCollectionUseCase({
        deleteCollection: deleteCollectionRepository,
      }),
    }),
    getCollection: makeGetCollectionController({
      getCollectionUseCase: makeGetCollectionUseCase({
        getCollection: getCollectionRepository,
      }),
    }),
    getCollections: makeGetCollectionsController({
      getCollectionsUseCase: makeGetCollectionsUseCase({
        getCollections: getCollectionsRepository,
      }),
    }),
    updateCollection: makeUpdateCollectionController({
      updateCollectionUseCase: makeUpdateCollectionUseCase({
        updateCollection: updateCollectionRepository,
      }),
    }),
    addPath: makeAddPathController({
      addPathUseCase: makeAddPathUseCase({
        getCollection: getCollectionRepository,
        updateCollection: updateCollectionRepository,
      }),
    }),
    deletePath: makeDeletePathController({
      deletePathUseCase: makeDeletePathUseCase({
        getCollection: getCollectionRepository,
        updateCollection: updateCollectionRepository,
      }),
    }),
    updatePath: makeUpdatePathController({
      updatePathUseCase: makeUpdatePathUseCase({
        updateCollection: updateCollectionRepository,
        getCollection: getCollectionRepository,
      }),
    }),
    defaultHandler: (req: Request, res: Response) => proxyServer.web(req, res),
  };
};
export default bootstrapApp;
