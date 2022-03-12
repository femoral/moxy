import { Path, PathMethod } from './path';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

export class ProxyPath extends Path {
  private readonly _target: string;

  constructor(
    id = uuid(),
    collection: string,
    path: string,
    method: PathMethod,
    private _targetHost: string,
    private _proxyServer?: any,
    private _basePath: string = '',
    private _stripBasePath = true
  ) {
    super(id, collection, path, method);
    this._target = _stripBasePath ? `${_targetHost}${_basePath}${path}` : `${_targetHost}${path}`;
  }

  get targetHost(): string {
    return this._targetHost;
  }

  handler(req: Request, res: Response): void {
    this._proxyServer.web(req, res, {
      target: this._target,
    });
  }
}
