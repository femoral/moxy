export interface Path {
  id?: string;
  collection: string;
  type: PathType;
  path: string;
  method: PathMethod;
}

export interface Proxy extends Path {
  type: "proxy";
  target: string;
}

export interface Mock extends Path {
  type: "mock";
  responseBody: string;
  contentType?: string;
  encoded?: boolean;
}

export type PathType = "mock" | "proxy";
export type PathMethod = "get" | "post" | "patch" | "options" | "put" | "all";
