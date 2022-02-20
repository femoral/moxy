import { PathMethod, PathType } from "../../../domain/model/Path";

export interface PathFormViewModel {
  id?: string;
  collection: string;
  method: PathMethod;
  path: string;
  type: PathType;
}

export interface MockFormViewModel extends PathFormViewModel {
  type: "mock";
  encoded: boolean;
  contentType: string;
  responseBody: string;
}

export interface ProxyFormViewModel extends PathFormViewModel {
  type: "proxy";
  targetHost: string;
  targetScheme: string;
}
