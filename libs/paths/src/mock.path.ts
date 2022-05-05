import { Path, PathMethod } from './path';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

export class MockPath extends Path {
  private _response: string | Buffer;

  constructor(
    id = uuid(),
    collection: string,
    path: string,
    method: PathMethod,
    private _responseBody: string,
    private _contentType = 'application/json',
    private _encoded = false,
    private _status = 200
  ) {
    super(id, collection, path, method);

    if (_encoded) {
      this._response = Buffer.from(_responseBody, 'base64');
    } else {
      this._response = _responseBody;
    }
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

  get status(): number {
    return this._status;
  }

  handler(req: Request, res: Response): void {
    res.status(this._status).contentType(this._contentType).send(this._response);
  }
}
