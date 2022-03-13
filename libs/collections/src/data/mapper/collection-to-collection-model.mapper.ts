import { CollectionModel, PathMap } from '../model/collection.model';
import { Collection } from '../../collection';
import { Path, PathToPathModelMapper } from '@moxy-js/paths';

export const makeCollectionToCollectionModelMapper = ({
  pathMapper,
}: {
  pathMapper: PathToPathModelMapper;
}): CollectionToCollectionModelMapper => {
  return {
    map: (collection: Collection): CollectionModel => {
      const collectionModel: CollectionModel = {
        id: collection.id,
        name: collection.name,
        basePath: collection.basePath,
        paths: collection.paths.reduce((paths: PathMap, path: Path) => {
          paths[path.id] = pathMapper.map(path);
          return paths;
        }, {}),
      };
      return collectionModel;
    },
    reverseMap: (collection: CollectionModel): Collection => {
      return new Collection(
        collection.id,
        collection.name,
        collection.basePath,
        Object.keys(collection.paths).map((pathId) =>
          pathMapper.reverseMap({
            ...collection.paths[pathId],
            id: pathId,
            collectionId: collection.id,
            collectionBasePath: collection.basePath,
          })
        )
      );
    },
  };
};

export type CollectionToCollectionModelMapper = {
  map: (collection: Collection) => CollectionModel;
  reverseMap: (collection: CollectionModel) => Collection;
};
