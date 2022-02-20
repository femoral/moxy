import { Path } from "../model/Path";

export interface UpdatePathRepository {
  update(path: Path): Promise<void>;
}
