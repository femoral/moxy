import { UpdateCollection } from '../repository/collection.repository';
import { Collection } from '../collection';
import { CollectionModel, PathMap } from './model/collection.model';
import { Path } from '@moxy-js/paths';
import { pathMapper } from '@moxy-js/paths';
import { promises as fs } from 'fs';
import path from 'path';

const makeJsonUpdateCollectionRepository =
  ({ collectionsBasePath }: { collectionsBasePath: string }): UpdateCollection =>
  async (collection: Collection): Promise<void> => {
    const model: CollectionModel = {
      id: collection.id,
      basePath: collection.basePath,
      name: collection.name,
      paths: collection.paths.reduce((paths: PathMap, path: Path) => {
        paths[path.id] = pathMapper.map(path);
        return paths;
      }, {}),
    };
    await fs.writeFile(
      path.join(collectionsBasePath, collection.id, 'collection.json'),
      JSON.stringify(model, undefined, 4)
    );
  };

export { makeJsonUpdateCollectionRepository };
