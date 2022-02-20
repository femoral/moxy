import {Path, PathMethod} from "./path";
import {Request, Response} from "express";
import {v4 as uuid} from "uuid";

export class ProxyPath extends Path {
  constructor(
    id = uuid(),
    collection: string,
    path: string,
    method: PathMethod,
    private _target: string,
    private _proxyServer?: any
  ) {
    super(id, collection, path, method);
  }

  get target(): string {
    return this._target;
  }

  handler(req: Request, res: Response): void {
    this._proxyServer.web(req, res, {
      target: this._target + req.path.replace(/^\/[a-zA-Z0-9-_]+/, ""),
    });
  }
}
