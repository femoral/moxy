import { PathMethod } from '../../path';

export interface PathModel {
  id: string;
  type: PathType;
  path: string;
  method: PathMethod;
}

export interface ProxyModel extends PathModel {
  type: 'proxy';
  target: string;
}

export interface MockModel extends PathModel {
  type: 'mock';
  responseBody: string;
  contentType?: string;
  encoded?: boolean;
}

type PathType = 'mock' | 'proxy';
