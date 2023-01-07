import { Path } from './Path';

export interface Collection {
  id?: string;
  name: string;
  basePath: string;
  paths?: Path[];
  fallbackProxy?: Path;
}
