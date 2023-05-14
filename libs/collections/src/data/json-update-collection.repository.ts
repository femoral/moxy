import { UpdateCollection } from '../repository/collection.repository';
import { Collection } from '../collection';
import { CollectionModel, PathMap } from './model/collection.model';
import { promises as fs } from 'fs';
import path from 'path';
import { CollectionToCollectionModelMapper } from './mapper/collection-to-collection-model.mapper';

const makeJsonUpdateCollectionRepository =
  ({
    collectionsBasePath,
    collectionMapper,
  }: {
    collectionsBasePath: string;
    collectionMapper: CollectionToCollectionModelMapper;
  }): UpdateCollection =>
  async (collection: Collection): Promise<void> => {
    const model: CollectionModel = collectionMapper.map(collection);

    await fs.writeFile(
      path.join(collectionsBasePath, collection.id, 'collection.json'),
      JSON.stringify(model, undefined, 4)
    );
  };

export { makeJsonUpdateCollectionRepository };
