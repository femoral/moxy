import { GetCollection } from '../repository/collection.repository';
import { Collection } from '../collection';
import path from 'path';
import { CollectionModel } from './model/collection.model';
import { promises as fs } from 'fs';
import { CollectionToCollectionModelMapper } from './mapper/collection-to-collection-model.mapper';

const makeJsonGetCollectionRepository =
  ({
    collectionsBasePath,
    collectionMapper,
  }: {
    collectionsBasePath: string;
    collectionMapper: CollectionToCollectionModelMapper;
  }): GetCollection =>
  async (id: string): Promise<Collection> => {
    const collectionFilePath = path.join(collectionsBasePath, id, 'collection.json');

    const collection: CollectionModel = JSON.parse(await fs.readFile(collectionFilePath, 'utf-8'));

    return collectionMapper.reverseMap(collection);
  };

export { makeJsonGetCollectionRepository };
