import { Mapper } from '../../../common/Mapper';
import {
  MockFormViewModel,
  PathFormViewModel,
  ProxyFormViewModel,
} from '../model/PathFromViewModel';
import { Mock, Path, Proxy } from '../../../domain/model/Path';

export class PathFormViewModelToPathMapper extends Mapper<
  PathFormViewModel,
  Path
> {
  map(input: PathFormViewModel): Path {
    switch (input.type) {
      case 'mock':
        return this.mapMock(input as MockFormViewModel);
      case 'proxy':
        return this.mapProxy(input as ProxyFormViewModel);
      default:
        return {
          collection: input.collection,
          path: input.path,
          method: input.method,
          type: input.type,
        };
    }
  }

  private mapProxy(proxyFormViewModel: ProxyFormViewModel): Proxy {
    return {
      id: proxyFormViewModel.id,
      collection: proxyFormViewModel.collection,
      path: `/${proxyFormViewModel.path}`,
      method: proxyFormViewModel.method,
      type: 'proxy',
      target: proxyFormViewModel.targetScheme + proxyFormViewModel.targetHost,
    };
  }

  private mapMock(mockFormViewModel: MockFormViewModel): Mock {
    return {
      id: mockFormViewModel.id,
      collection: mockFormViewModel.collection,
      contentType: mockFormViewModel.contentType,
      encoded: mockFormViewModel.encoded,
      method: mockFormViewModel.method,
      path: `/${mockFormViewModel.path}`,
      responseBody: mockFormViewModel.responseBody,
      type: 'mock',
    };
  }
}
