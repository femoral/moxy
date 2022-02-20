import { Collection } from "./model/Collection";
import { DeleteCollectionRepository } from "./repository/DeleteCollectionRepository";

export class DeleteCollectionUseCase {
  constructor(
    private readonly deleteCollectionRepository: DeleteCollectionRepository
  ) {}

  async execute(collection: Collection): Promise<void> {
    await this.deleteCollectionRepository.delete(collection);
  }
}
