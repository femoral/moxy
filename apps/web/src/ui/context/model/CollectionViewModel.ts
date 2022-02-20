import { PathViewModel } from "./PathViewModel";

export interface CollectionViewModel {
  id?: string;
  name: string;
  basePath: string;
  paths: PathViewModel[];
  pathNumber: number;
}
