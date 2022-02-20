import { Collection } from "../model/Collection";

export interface DeleteCollectionRepository {
  delete(collection: Collection): Promise<void>;
}
