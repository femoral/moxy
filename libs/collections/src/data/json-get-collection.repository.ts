import { GetCollection } from '../repository/collection.repository';
import { Collection } from '../collection';
import path from 'path';
import { CollectionModel } from './model/collection.model';
import { promises as fs } from 'fs';
import { MockModel, MockPath, ProxyModel, ProxyPath } from '@moxy-js/paths';

const makeJsonGetCollectionRepository =
  ({ collectionsBasePath, proxyServer }: { collectionsBasePath: string; proxyServer?: any }): GetCollection =>
  async (id: string): Promise<Collection> => {
    const collectionFilePath = path.join(collectionsBasePath, id, 'collection.json');
    const collection: CollectionModel = JSON.parse(await fs.readFile(collectionFilePath, 'utf-8'));

    return new Collection(collection.id, collection.name, collection.basePath, Object.keys(collection.paths).map(map));

    function map(id: string) {
      const path = collection.paths[id];
      switch (path.type) {
        case 'mock':
          return mapMock(id, collection, path as MockModel);
        case 'proxy':
          return mapProxy(id, collection, path as ProxyModel);
      }
    }

    function mapProxy(id: string, collection: CollectionModel, path: ProxyModel) {
      return new ProxyPath(id, collection.id, path.path, path.method, path.target, proxyServer, collection.basePath);
    }

    function mapMock(id: string, collection: CollectionModel, path: MockModel) {
      return new MockPath(id, collection.id, path.path, path.method, path.responseBody, path.contentType, path.encoded);
    }
  };
export { makeJsonGetCollectionRepository };
