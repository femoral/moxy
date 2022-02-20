import { Path, PathMethod } from "./path";
import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

export class MockPath extends Path {
  constructor(
    id = uuid(),
    collection: string,
    path: string,
    method: PathMethod,
    private _responseBody: string,
    private _contentType = "application/json",
    private _encoded = false
  ) {
    super(id, collection, path, method);
  }

  get responseBody(): string {
    return this._responseBody;
  }

  get contentType(): string {
    return this._contentType;
  }

  get encoded(): boolean {
    return this._encoded;
  }

  handler(req: Request, res: Response): void {
    res.contentType(this._contentType).send(this._responseBody);
  }
}
