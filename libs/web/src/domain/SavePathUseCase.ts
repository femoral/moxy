import { Path } from './model/Path';
import { AddPathRepository } from './repository/AddPathRepository';
import { UpdatePathRepository } from './repository/UpdatePathRepository';

export class SavePathUseCase {
  constructor(
    private readonly addPathRepository: AddPathRepository,
    private readonly updatePathRepository: UpdatePathRepository
  ) {}

  async execute(path: Path): Promise<void> {
    if (path.id) await this.updatePathRepository.update(path);
    else await this.addPathRepository.add(path);
  }
}
