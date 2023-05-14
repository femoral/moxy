import { Path } from './model/Path';
import { DeletePathRepository } from './repository/DeletePathRepository';

export class DeletePathUseCase {
  constructor(private readonly deletePathRepository: DeletePathRepository) {}

  async execute(path: Path): Promise<void> {
    await this.deletePathRepository.delete(path);
  }
}
