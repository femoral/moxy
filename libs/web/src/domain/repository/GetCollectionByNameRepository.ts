import { Collection } from '../model/Collection';

export interface GetCollectionByNameRepository {
  getCollectionById(name: string): Promise<Collection>;
}
