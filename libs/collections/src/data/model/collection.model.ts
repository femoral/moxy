import { PathModel } from '@moxy-js/paths';

export const DATA_VERSION = 1;

export interface CollectionModel {
  dataVersion: number;
  id: string;
  name: string;
  basePath: string;
  paths: PathMap;
  fallbackProxy?: PathModel;
}

export type PathMap = { [id: string]: PathModel };
