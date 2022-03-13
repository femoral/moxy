import { MockModel, PathModel, ProxyModel } from '../model/path.model';
import { Path } from '../../path';
import { ProxyPath } from '../../proxy.path';
import { MockPath } from '../../mock.path';

export const makePathToPathModelMapper = ({ proxyServer }: { proxyServer?: any }): PathToPathModelMapper => {
  return {
    map: (path) => {
      const mapProxy = (path: ProxyPath): ProxyModel => ({
        id: path.id,
        type: 'proxy',
        path: path.path,
        method: path.method,
        target: path.targetHost,
      });

      const mapMock = (path: MockPath): MockModel => ({
        id: path.id,
        type: 'mock',
        path: path.path,
        method: path.method,
        responseBody: path.responseBody,
        contentType: path.contentType,
        encoded: path.encoded,
      });

      switch (path.constructor.name) {
        case ProxyPath.name:
          return mapProxy(path as ProxyPath);
        case MockPath.name:
          return mapMock(path as MockPath);
        default:
          throw new Error('invalid path type');
      }
    },
    reverseMap: (path) => {
      const mapMock = (path: PathModelToMap<MockModel>) =>
        new MockPath(
          path.id,
          path.collectionId,
          path.path,
          path.method,
          path.responseBody,
          path.contentType,
          path.encoded
        );

      const mapProxy = (path: PathModelToMap<ProxyModel>) =>
        new ProxyPath(
          path.id,
          path.collectionId,
          path.path,
          path.method,
          path.target,
          proxyServer,
          path.collectionBasePath
        );

      if (path.type === 'mock') {
        return mapMock(path as PathModelToMap<MockModel>);
      } else {
        return mapProxy(path as PathModelToMap<ProxyModel>);
      }
    },
  };
};

export type PathToPathModelMapper = {
  map: (path: Path) => PathModel;
  reverseMap: (path: PathModelToMap<PathModel>) => Path;
};

export type PathModelToMap<P extends PathModel> = P & { collectionId: string; collectionBasePath: string };
