import { Path } from '../model/Path';

export interface AddPathRepository {
  add(path: Path): Promise<void>;
}
