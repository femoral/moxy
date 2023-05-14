import { Path } from '../model/Path';

export interface DeletePathRepository {
  delete(path: Path): Promise<void>;
}
