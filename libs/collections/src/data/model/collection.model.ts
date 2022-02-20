import { PathModel } from "@moxy/paths";

export interface CollectionModel {
  id: string;
  name: string;
  basePath: string;
  paths: PathMap;
}

export type PathMap = { [id: string]: PathModel };
