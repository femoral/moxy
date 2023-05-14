import { Mapper } from '../../../common/Mapper';
import { MockViewModel, PathViewModel, ProxyViewModel } from '../model/PathViewModel';
import { MockFormViewModel, PathFormViewModel, ProxyFormViewModel } from '../model/PathFromViewModel';

export class PathViewModelToPathFromViewModelMapper extends Mapper<PathViewModel, PathFormViewModel> {
  map(input: PathViewModel): PathFormViewModel {
    switch (input.type) {
      case 'mock':
        return this.mapMock(input as MockViewModel);
      case 'proxy':
        return this.mapProxy(input as ProxyViewModel);
      default:
        return {
          collection: '',
          method: 'get',
          path: '',
          type: 'mock',
        };
    }
  }

  private mapProxy(input: ProxyViewModel): ProxyFormViewModel {
    const [scheme, host] = input.target.split('://');
    return {
      id: input.id,
      path: input.path.substring(1),
      method: input.method,
      collection: input.collection,
      targetHost: host,
      targetScheme: scheme + '://',
      type: input.type,
    };
  }

  private mapMock(input: MockViewModel): MockFormViewModel {
    return {
      id: input.id,
      path: input.path.substring(1),
      method: input.method,
      collection: input.collection,
      contentType: input.contentType,
      encoded: input.encoded,
      responseBody: input.responseBody,
      type: input.type,
    };
  }
}
