import { GetCollectionsRepository } from "./repository/GetCollectionsRepository";
import { Collection } from "./model/Collection";

export class GetCollectionsUseCase {
  constructor(
    private readonly getCollectionsRepository: GetCollectionsRepository
  ) {}

  async execute(): Promise<Collection[]> {
    return await this.getCollectionsRepository.getCollections();
  }
}
