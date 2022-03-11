import { MockModel, PathModel, ProxyModel } from '../model/path.model';
import { Path } from '../../path';
import { ProxyPath } from '../../proxy.path';
import { MockPath } from '../../mock.path';

export function map(path: Path): PathModel {
  switch (path.constructor.name) {
    case ProxyPath.name:
      return mapProxy(path as ProxyPath);
    case MockPath.name:
      return mapMock(path as MockPath);
    default:
      throw new Error('invalid path type');
  }
}

function mapProxy(path: ProxyPath): ProxyModel {
  return {
    type: 'proxy',
    path: path.path,
    method: path.method,
    target: path.target,
  };
}

function mapMock(path: MockPath): MockModel {
  return {
    type: 'mock',
    path: path.path,
    method: path.method,
    responseBody: path.responseBody,
    contentType: path.contentType,
    encoded: path.encoded,
  };
}
