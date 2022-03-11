import { Request, Response } from 'express';

export abstract class Path {
  protected constructor(
    protected _id: string,
    protected _collection: string,
    protected _path: string,
    protected _method: PathMethod
  ) {}

  get id(): string {
    return this._id;
  }

  get collection(): string {
    return this._collection;
  }

  get path(): string {
    return this._path;
  }

  get method(): PathMethod {
    return this._method;
  }

  abstract handler(req: Request, res: Response): void;
}

export type PathMethod = 'get' | 'post' | 'patch' | 'options' | 'put' | 'all';
