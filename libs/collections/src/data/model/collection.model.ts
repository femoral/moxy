import { PathModel } from '@moxy-js/paths';

export interface CollectionModel {
  id: string;
  name: string;
  basePath: string;
  paths: PathMap;
}

export type PathMap = { [id: string]: PathModel };
