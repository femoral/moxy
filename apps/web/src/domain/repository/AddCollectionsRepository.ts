import { Collection } from "../model/Collection";

export interface AddCollectionRepository {
  addCollection(collection: Collection): Promise<Collection>;
}
