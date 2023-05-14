import { Collection } from '../model/Collection';

export interface UpdateCollectionRepository {
  update(collection: Collection): Promise<Collection>;
}
