import { Collection } from '../../../domain/model/Collection';
import { CollectionViewModel } from '../model/CollectionViewModel';
import { Mapper } from '../../../common/Mapper';
import { Mock, Proxy } from '../../../domain/model/Path';
import { ProxyViewModel } from '../model/PathViewModel';

export class CollectionToCollectionViewModelMapper extends Mapper<Collection, CollectionViewModel> {
  map(collection: Collection): CollectionViewModel {
    const [targetScheme, targetHost] = collection.fallbackProxy
      ? (collection.fallbackProxy as Proxy).target.split('://')
      : [];

    return {
      id: collection.id,
      name: collection.name,
      basePath: collection.basePath,
      paths: collection.paths?.map((route) => {
        switch (route.type) {
          case 'mock':
            return this.mapMock(route as Mock);
          case 'proxy':
            return this.mapProxy(route as Proxy);
          default:
            return {
              id: route.id,
              collection: route.collection,
              type: route.type,
              path: route.path,
              method: route.method,
            };
        }
      }),
      pathNumber: collection.paths?.length || 0,
      fallbackProxyEnabled: !!collection.fallbackProxy,
      targetHost,
      targetScheme,
    };
  }

  private mapProxy(proxy: Proxy): ProxyViewModel {
    return {
      id: proxy.id,
      collection: proxy.collection,
      type: proxy.type,
      path: proxy.path,
      method: proxy.method,
      target: proxy.target,
    };
  }

  private mapMock(mock: Mock) {
    return {
      id: mock.id,
      collection: mock.collection,
      type: mock.type,
      path: mock.path,
      method: mock.method,
      responseBody: mock.responseBody,
      contentType: mock.contentType,
      encoded: mock.encoded,
    };
  }
}
