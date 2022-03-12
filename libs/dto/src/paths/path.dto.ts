export interface PathDto {
  id?: string;
  collection: string;
  type: PathType;
  path: string;
  method: PathMethod;
}

export interface ProxyDto extends PathDto {
  type: 'proxy';
  target: string;
}

export interface MockDto extends PathDto {
  type: 'mock';
  responseBody: string;
  contentType?: string;
  encoded?: boolean;
}

type PathType = 'mock' | 'proxy';
type PathMethod = 'get' | 'post' | 'patch' | 'options' | 'put' | 'all';
