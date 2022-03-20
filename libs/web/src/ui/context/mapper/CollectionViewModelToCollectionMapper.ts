import { Collection } from '../../../domain/model/Collection';
import { CollectionViewModel } from '../model/CollectionViewModel';
import { Mapper } from '../../../common/Mapper';
import { Proxy } from '../../../domain/model/Path';

export class CollectionViewModelToCollectionMapper extends Mapper<CollectionViewModel, Collection> {
  map(collection: CollectionViewModel): Collection {
    const fallbackProxy: Proxy | undefined = collection.fallbackProxyEnabled
      ? {
          type: 'proxy',
          id: 'default',
          collection: collection.id ?? '',
          method: 'all',
          path: '/*',
          target: `${collection.targetScheme}${collection.targetHost}`,
        }
      : undefined;

    return {
      id: collection.id,
      name: collection.name,
      basePath: collection.basePath,
      fallbackProxy,
    };
  }
}
