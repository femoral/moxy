import { PathMethod, PathType } from '../../../domain/model/Path';

export interface PathViewModel {
  id?: string;
  collection: string;
  type: PathType;
  path: string;
  method: PathMethod;
}

export interface MockViewModel extends PathViewModel {
  type: 'mock';
  responseBody: string;
  contentType: string;
  encoded: boolean;
}

export interface ProxyViewModel extends PathViewModel {
  type: 'proxy';
  target: string;
}
