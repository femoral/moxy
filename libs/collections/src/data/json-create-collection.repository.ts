import { Collection } from '../collection';
import path from 'path';
import { existsSync } from 'graceful-fs';
import { promises as fs } from 'fs';
import { CreateCollection } from '../repository/collection.repository';
import { CollectionToCollectionModelMapper } from './mapper/collection-to-collection-model.mapper';

const makeJsonCreateCollectionRepository =
  ({
    collectionsBasePath,
    collectionMapper,
  }: {
    collectionsBasePath: string;
    collectionMapper: CollectionToCollectionModelMapper;
  }): CreateCollection =>
  async (collection: Collection): Promise<void> => {
    const collectionFolder = path.join(collectionsBasePath, collection.id);
    if (existsSync(collectionFolder)) {
      throw new Error('collection already exists');
    } else {
      await fs.mkdir(collectionFolder);
      await fs.writeFile(
        path.join(collectionFolder, 'collection.json'),
        JSON.stringify(collectionMapper.map(collection), undefined, 4)
      );
    }
  };
export { makeJsonCreateCollectionRepository };
