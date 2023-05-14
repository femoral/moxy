import { GetCollectionByNameRepository } from './repository/GetCollectionByNameRepository';
import { Collection } from './model/Collection';

export class GetCollectionByIdUseCase {
  constructor(private readonly getCollectionsRepository: GetCollectionByNameRepository) {}

  async execute(id: string): Promise<Collection> {
    return await this.getCollectionsRepository.getCollectionById(id);
  }
}
