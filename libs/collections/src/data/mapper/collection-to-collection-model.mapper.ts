import { CollectionModel, DATA_VERSION, PathMap } from '../model/collection.model';
import { Collection } from '../../collection';
import { Path, PathToPathModelMapper, ProxyPath } from '@moxy-js/paths';

export const makeCollectionToCollectionModelMapper = ({
  pathMapper,
}: {
  pathMapper: PathToPathModelMapper;
}): CollectionToCollectionModelMapper => {
  return {
    map: (collection: Collection): CollectionModel => {
      return {
        dataVersion: DATA_VERSION,
        id: collection.id,
        name: collection.name,
        basePath: collection.basePath,
        paths: collection.paths.reduce((paths: PathMap, path: Path) => {
          paths[path.id] = pathMapper.map(path);
          return paths;
        }, {}),
        fallbackProxy: collection.fallbackProxy && pathMapper.map(collection.fallbackProxy),
      };
    },
    reverseMap: (collection: CollectionModel): Collection => {
      const paths = Object.keys(collection.paths).map((pathId) =>
        pathMapper.reverseMap({
          ...collection.paths[pathId],
          id: pathId,
          collectionId: collection.id,
          collectionBasePath: collection.basePath,
        })
      );

      return new Collection(
        collection.id,
        collection.name,
        collection.basePath,
        paths,
        collection.fallbackProxy &&
          (pathMapper.reverseMap({
            ...collection.fallbackProxy,
            id: 'default',
            collectionId: collection.id,
            collectionBasePath: collection.basePath,
          }) as ProxyPath)
      );
    },
  };
};

export type CollectionToCollectionModelMapper = {
  map: (collection: Collection) => CollectionModel;
  reverseMap: (collection: CollectionModel) => Collection;
};
