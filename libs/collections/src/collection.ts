import { Path } from '@moxy-js/paths';
import { v4 as uuid } from 'uuid';

export class Collection {
  private readonly _id: string;

  constructor(
    id: string = uuid(),
    private readonly _name: string,
    private readonly _basePath: string,
    private _paths: Path[] | undefined = [],
    private _fallbackProxy?: Path
  ) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get basePath(): string {
    return this._basePath;
  }

  get paths(): Path[] {
    return this._paths || [];
  }

  get fallbackProxy(): Path | undefined {
    return this._fallbackProxy;
  }

  addPath(path: Path): void {
    this.paths.push(path);
  }

  updatePath(updatedPath: Path) {
    const index = this.paths.findIndex((path) => path.id === updatedPath.id);
    if (index >= 0) this.paths[index] = updatedPath;
  }

  removePath(pathId: string) {
    this._paths = this.paths.filter((path) => path.id !== pathId);
  }
}
