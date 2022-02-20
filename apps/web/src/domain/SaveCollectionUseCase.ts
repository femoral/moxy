import { Collection } from "./model/Collection";
import { AddCollectionRepository } from "./repository/AddCollectionsRepository";
import { UpdateCollectionRepository } from "./repository/UpdateCollectionRepository";

export class SaveCollectionUseCase {
  constructor(
    private readonly addCollectionRepository: AddCollectionRepository,
    private readonly updateCollectionRepository: UpdateCollectionRepository
  ) {}

  async execute(collection: Collection): Promise<Collection> {
    if (collection.id) {
      return await this.updateCollectionRepository.update(collection);
    } else {
      return await this.addCollectionRepository.addCollection(collection);
    }
  }
}
